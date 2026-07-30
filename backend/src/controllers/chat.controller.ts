import { Body, Controller, Post } from '@nestjs/common';
import { ClaudeService } from '../services/claude.service';
import { ChatMessageDto } from '../models/dto/chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post()
  async create(@Body() body: ChatMessageDto) {
    const reply = await this.claudeService.replyToMessage(body.message, body.chatId);
    return { reply };
  }
}
