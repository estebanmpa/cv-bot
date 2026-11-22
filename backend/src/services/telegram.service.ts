import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.getOrThrow<string>('telegram.botToken');
    this.apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  }

  // Resolves to whether Telegram accepted the message, so callers can react.
  async sendMessage(chatId: number | string, text: string): Promise<boolean> {
    try {
      await axios.post(this.apiUrl, {
        chat_id: chatId,
        text,
      });
      return true;
    } catch (error) {
      this.logger.error('Error sending message to Telegram', error);
      return false;
    }
  }
}
