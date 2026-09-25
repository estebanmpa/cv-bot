import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import type { Message } from '@anthropic-ai/sdk/resources';
import { SYSTEM_CONTEXT } from '../config/context';
import { RedisService, ChatMessage } from './redis.service';

export type Channel = 'telegram' | 'webchat' | 'whatsapp';

// Token the model may use to split its reply into separate messages
// (used on channels that don't render HTML, e.g. WhatsApp / Telegram).
export const MESSAGE_SPLIT_TOKEN = '[[SPLIT]]';

// Splits a model reply on MESSAGE_SPLIT_TOKEN into individual, trimmed messages.
export function splitReply(reply: string): string[] {
    return reply
        .split(MESSAGE_SPLIT_TOKEN)
        .map((part) => part.trim())
        .filter((part) => part.length > 0);
}

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

    async replyToMessage(message: string, from: string, channel: Channel): Promise<string> {
        try {
            this.logger.log(`receiveChatMessage: message="${message}", from="${from}", channel="${channel}"`);

            const history = await this.redisService.getHistory(from);
            const messages: ChatMessage[] = [
                ...history,
                { role: 'user', content: `[channel: ${channel}]\n${message}` },
            ];

            const response: Message = await this.anthropicClient.messages.create({
                model: this.configService.get<string>('LLM_MODEL')!,
                max_tokens: 500,
                system: SYSTEM_CONTEXT,
                messages,
            });

            const reply = this.extractReply(response);

            await this.redisService.saveHistory(from, [
                ...messages,
                { role: 'assistant', content: reply },
            ]);

            this.logger.log(`Claude API response: ${reply}`);
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
