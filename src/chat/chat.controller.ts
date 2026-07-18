import { Body, Controller, Post } from '@nestjs/common';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ClaudeService } from '../claude/claude.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post()
  async create(@Body() body: ChatMessageDto) {
    const reply = await this.claudeService.replyToMessage(body.message);
    return { reply };
  }
}
