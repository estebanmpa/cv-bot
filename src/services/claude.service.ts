import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import type { Message } from '@anthropic-ai/sdk/resources';
import { SYSTEM_CONTEXT } from '../config/context';

@Injectable()
export class ClaudeService {
    private readonly logger = new Logger(ClaudeService.name);
    private readonly anthropicClient: Anthropic;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');
        this.anthropicClient = new Anthropic({ apiKey });
    }

    async replyToMessage(message: string): Promise<string> {
        try {
            const response: Message = await this.anthropicClient.messages.create({
                model: 'claude-sonnet-4-6',
                max_tokens: 500,
                system: SYSTEM_CONTEXT,
                messages: [
                    { role: 'user', content: message }
                ]
            });

            return this.extractReply(response);
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
