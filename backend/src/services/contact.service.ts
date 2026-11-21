import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactRequestDto } from '../models/dto/contact-request.dto';
import { TelegramService } from './telegram.service';

const UNAVAILABLE_MESSAGE =
    'Your message could not be delivered right now. Please try again or email me directly.';

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly telegramService: TelegramService,
    ) { }

    async submit(request: ContactRequestDto): Promise<void> {
        if (request.website) {
            this.logger.warn('Dropped a contact request that filled the honeypot');
            return;
        }

        const delivered = await this.notifyOwner(formatContactNotification(request));
        if (!delivered) throw new ServiceUnavailableException(UNAVAILABLE_MESSAGE);
    }

    private async notifyOwner(text: string): Promise<boolean> {
        const ownerChatId = this.configService.get<string>('telegram.ownerChatId');
        if (!ownerChatId) {
            this.logger.error('TELEGRAM_OWNER_CHAT_ID is not set; contact requests are lost');
            return false;
        }

        return this.telegramService.sendMessage(ownerChatId, text);
    }
}

export function formatContactNotification(request: ContactRequestDto): string {
    return [
        '📩 New contact request',
        `Name: ${request.name}`,
        `Email: ${request.email}`,
        `Project type: ${request.projectType}`,
        '',
        request.message,
    ].join('\n');
}
