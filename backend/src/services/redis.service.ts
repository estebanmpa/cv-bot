import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

// cache-manager v7 expects TTLs in milliseconds.
const HISTORY_TTL_MS = 24 * 60 * 60 * 1000;
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
                HISTORY_TTL_MS
            );
        } catch (error) {
            this.logger.error(`Error saving history for ${from}`, error as Error);
        }
    }

    private historyKey(from: string): string {
        return `chat:history:${from}`;
    }
}
