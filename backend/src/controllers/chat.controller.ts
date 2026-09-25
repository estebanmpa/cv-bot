import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ClaudeService, splitReply } from '../services/claude.service';
import { ChatMessageDto } from '../models/dto/chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly claudeService: ClaudeService) { }

  private readonly logger = new Logger(ChatController.name);
  
  @Post()
  async create(@Body() body: ChatMessageDto) {
    const reply = await this.claudeService.replyToMessage(body.message, body.chatId, 'webchat');
    return { replies: splitReply(reply) };
  }
}
