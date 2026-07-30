import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import type { Message } from '@anthropic-ai/sdk/resources';
import { SYSTEM_CONTEXT } from '../config/context';
import { RedisService, ChatMessage } from './redis.service';

@Injectable()
export class ClaudeService {
    private readonly logger = new Logger(ClaudeService.name);
    private readonly anthropicClient: Anthropic;

    constructor(
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
    ) {
        const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');
        this.anthropicClient = new Anthropic({ apiKey });
    }

    async replyToMessage(message: string, from: string): Promise<string> {
        try {
            const history = await this.redisService.getHistory(from);
            const messages: ChatMessage[] = [
                ...history,
                { role: 'user', content: message },
            ];

            const response: Message = await this.anthropicClient.messages.create({
                model: 'claude-sonnet-4-6',
                max_tokens: 500,
                system: SYSTEM_CONTEXT,
                messages,
            });

            const reply = this.extractReply(response);

            await this.redisService.saveHistory(from, [
                ...messages,
                { role: 'assistant', content: reply },
            ]);

            return reply;
        } catch (error) {
            this.logger.error('Error calling Claude API', error as Error);
            throw new Error('Unable to generate response from Claude');
        }
    }

    private extractReply(response: Message): string {
        let extractedReply: string = '';
        for (const block of response.content) {
            if (block.type === "text") {
                extractedReply += block.text;
            }
        }

        return extractedReply;
    }
}
