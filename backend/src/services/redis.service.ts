import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const HISTORY_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const MAX_HISTORY_MESSAGES = 20; // last 10 user/assistant pairs

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly logger = new Logger(RedisService.name);
    private readonly client: Redis;

    constructor(private readonly configService: ConfigService) {
        const host = this.configService.get<string>('REDIS_HOST', 'localhost');
        const port = Number(this.configService.get<string>('REDIS_PORT', '6379'));

        this.client = new Redis({ host, port });
        this.client.on('error', (error) => this.logger.error('Redis connection error', error));
    }

    async getHistory(from: string): Promise<ChatMessage[]> {
        try {
            const raw = await this.client.get(this.historyKey(from));
            return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
        } catch (error) {
            this.logger.error(`Error reading history for ${from}`, error as Error);
            return [];
        }
    }

    async saveHistory(from: string, messages: ChatMessage[]): Promise<void> {
        try {
            const truncated = messages.slice(-MAX_HISTORY_MESSAGES);
            await this.client.set(
                this.historyKey(from),
                JSON.stringify(truncated),
                'EX',
                HISTORY_TTL_SECONDS,
            );
        } catch (error) {
            this.logger.error(`Error saving history for ${from}`, error as Error);
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.client.quit();
    }

    private historyKey(from: string): string {
        return `chat:history:${from}`;
    }
}
