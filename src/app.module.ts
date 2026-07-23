import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClaudeService } from './services/claude.service';
import { WebhookController } from './controllers/webhook.controller';
import { WhatsappService } from './services/whatsapp.service';

const controllers = [
  // ChatController, disabled because we are using the webhook for WhatsApp messages
  WebhookController
];

@Module({
  controllers: [...controllers],
  providers: [ClaudeService, WhatsappService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
})
export class AppModule { }
