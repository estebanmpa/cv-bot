import {
    Controller,
    Get,
    Post,
    Query,
    Body,
    Res,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ClaudeService } from '../services/claude.service';
import { WhatsappService } from '../services/whatsapp.service';
import { TelegramService } from '../services/telegram.service';
import { WhatsappWebhookDto } from '../models/dto/whatsapp-webhook.dto';
import { TelegramWebhookDto } from '../models/dto/telegram-webhook.dto';

@Controller('webhooks')
export class WebhookController {
    private readonly logger = new Logger(WebhookController.name);

    constructor(
        private readonly claudeService: ClaudeService,
        private readonly whatsappService: WhatsappService,
        private readonly telegramService: TelegramService,
    ) { }

    // Meta calls this endpoint once to verify the webhook when configuring it
    @Get('whatsapp')
    verifyWhatsappWebhook(@Query() query: any, @Res() res: Response) {
        const mode = query['hub.mode'];
        const token = query['hub.verify_token'];
        const challenge = query['hub.challenge'];

        if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
            this.logger.log('Webhook verified successfully');
            return res.status(HttpStatus.OK).send(challenge);
        }

        return res.status(HttpStatus.FORBIDDEN).send();
    }

    // This endpoint is called by Meta (WhatsApp) every time a new message is received. It is the webhook that receives incoming messages.
    @Post('whatsapp')
    async receiveWhatsappMessage(@Body() body: WhatsappWebhookDto, @Res() res: Response) {
        // We respond 200 immediately so that Meta does not retry the webhook
        res.status(HttpStatus.OK).send();

        this.logger.log(`receiveWhatsappMessage: ${JSON.stringify(body)}`);
        
        try {
            const entry = body?.entry?.[0];
            const change = entry?.changes?.[0];
            const message = change?.value?.messages?.[0];

            // The webhook may arrive without a message (e.g., read receipts), we ignore it.
            if (!message || message.type !== 'text' || !message.text) {
                return;
            }

            const from = message.from; // user's phone number
            const userText = message.text.body;

            this.logger.log(`Message from ${from}: ${userText}`);

            const reply = await this.claudeService.replyToMessage(userText, from);
            await this.whatsappService.sendMessage(from, reply);
        } catch (error) {
            this.logger.error('Error processing incoming message', error);
        }
    }

    // This endpoint is called by Telegram every time a new message is received. It is the webhook that receives incoming messages.
    @Post('telegram')
    async receiveTelegramMessage(@Body() body: TelegramWebhookDto, @Res() res: Response) {
        // We respond 200 immediately so that Telegram does not retry the webhook
        res.status(HttpStatus.OK).send();

        this.logger.log(`receiveTelegramMessage: ${JSON.stringify(body)}`);

        try {
            const message = body?.message;

            // The webhook may arrive without a text message (e.g., stickers, edits), we ignore it.
            if (!message || typeof message.text !== 'string' || !message.chat) {
                return;
            }

            const chatId = message.chat.id;
            const userText = message.text;

            this.logger.log(`Message from ${chatId}: ${userText}`);

            const reply = await this.claudeService.replyToMessage(userText, String(chatId));
            await this.telegramService.sendMessage(chatId, reply);
        } catch (error) {
            this.logger.error('Error processing incoming message', error);
        }
    }
}
