import { CACHE_MANAGER } from '@nestjs/cache-manager/dist/cache.constants';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const HISTORY_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const MAX_HISTORY_MESSAGES = 20; // last 10 user/assistant pairs

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    private readonly logger = new Logger(RedisService.name);

    async getHistory(from: string): Promise<ChatMessage[]> {
        try {
            const raw: string | undefined = await this.cache.get(this.historyKey(from));
            return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
        } catch (error) {
            this.logger.error(`Error reading history for ${from}`, error as Error);
            return [];
        }
    }

    async saveHistory(from: string, messages: ChatMessage[]): Promise<void> {
        try {
            const truncated = messages.slice(-MAX_HISTORY_MESSAGES);
            await this.cache.set(
                this.historyKey(from),
                JSON.stringify(truncated),
                HISTORY_TTL_SECONDS
            );
        } catch (error) {
            this.logger.error(`Error saving history for ${from}`, error as Error);
        }
    }

    private historyKey(from: string): string {
        return `chat:history:${from}`;
    }
}
