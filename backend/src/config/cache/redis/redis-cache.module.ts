import { Logger, Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import KeyvRedis from '@keyv/redis';
import { ConfigService } from "@nestjs/config";
import { RedisService } from "../../../services/redis.service";

const logger = new Logger('RedisCacheModule');

@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const redisUrl = config.get<string>('cache.url');

                if (!redisUrl) {
                    throw new Error("Redis URL is not defined in environment variables!");
                }

                const store = new KeyvRedis(redisUrl);

                store.on('error', (err) => {
                    logger.error('Redis connection error', err);
                });

                return {
                    isGlobal: true,
                    stores: [store]
                };
            },
        })
    ],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisCacheModule { }
