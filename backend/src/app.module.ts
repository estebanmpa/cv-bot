import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClaudeService } from './services/claude.service';
import { WebhookController } from './controllers/webhook.controller';
import { WhatsappService } from './services/whatsapp.service';
import { TelegramService } from './services/telegram.service';
import { ChatController } from './controllers/chat.controller';
import { ProjectsController } from './controllers/projects.controller';
import { ServiceOfferingsController } from './controllers/service-offerings.controller';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { RedisCacheModule } from './config/cache/redis/redis-cache.module';
import configuration from './config/configuration';

const controllers = [
  ChatController,
  ProjectsController,
  ServiceOfferingsController,
  ContactController,
  WebhookController
];

@Module({
  controllers: [...controllers],
  providers: [ClaudeService, WhatsappService, TelegramService, ContactService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    RedisCacheModule
  ],
})
export class AppModule { }
