import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    this.apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  }

  async sendMessage(chatId: number | string, text: string): Promise<void> {
    try {
      await axios.post(this.apiUrl, {
        chat_id: chatId,
        text,
      });
    } catch (error) {
      this.logger.error('Error sending message to Telegram', error);
    }
  }
}
