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
import { ClaudeService } from 'src/services/claude.service';
import { WhatsappService } from 'src/services/whatsapp.service';

@Controller('webhooks')
export class WebhookController {
    private readonly logger = new Logger(WebhookController.name);

    constructor(
        private readonly claudeService: ClaudeService,
        private readonly whatsappService: WhatsappService,
    ) { }

    // Meta calls this endpoint once to verify the webhook when configuring it
    @Get('whatsapp')
    verifyWhatsappWebhook(@Query() query: any, @Res() res: Response) {
        const mode = query['hub.mode'];
        const token = query['hub.verify_token'];
        const challenge = query['hub.challenge'];

        if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
            this.logger.log('Webhook verificado correctamente');
            return res.status(HttpStatus.OK).send(challenge);
        }

        return res.status(HttpStatus.FORBIDDEN).send();
    }

    // This endpoint is called by Meta (WhatsApp) every time a new message is received. It is the webhook that receives incoming messages.
    @Post('whatsapp')
    async receiveWhatsappMessage(@Body() body: any, @Res() res: Response) {
        // We respond 200 immediately so that Meta does not retry the webhook
        res.status(HttpStatus.OK).send();

        try {
            const entry = body?.entry?.[0];
            const change = entry?.changes?.[0];
            const message = change?.value?.messages?.[0];

            // The webhook may arrive without a message (e.g., read receipts), we ignore it.
            if (!message || message.type !== 'text') {
                return;
            }

            const from = message.from; // número del usuario
            const userText = message.text.body;

            this.logger.log(`Mensaje de ${from}: ${userText}`);

            const reply = await this.claudeService.replyToMessage(userText);
            await this.whatsappService.sendMessage(from, reply);
        } catch (error) {
            this.logger.error('Error procesando mensaje entrante', error);
        }
    }
}
