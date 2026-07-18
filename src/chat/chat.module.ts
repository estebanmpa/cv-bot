import { Module } from '@nestjs/common';
import { ClaudeService } from '../claude/claude.service';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ClaudeService],
})
export class ChatModule {}
