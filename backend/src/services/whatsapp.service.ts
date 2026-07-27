import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly apiUrl: string;
  private readonly token: string;

  constructor(private readonly configService: ConfigService) {
    const phoneNumberId = this.configService.getOrThrow<string>('WHATSAPP_PHONE_NUMBER_ID');
    this.apiUrl = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    this.token = this.configService.getOrThrow<string>('WHATSAPP_TOKEN');
  }

  async sendMessage(to: string, text: string): Promise<void> {
    try {
      await axios.post(
        this.apiUrl,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: text },
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      this.logger.error('Error enviando mensaje a WhatsApp', error);
    }
  }
}
