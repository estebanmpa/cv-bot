import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import KeyvRedis from '@keyv/redis';
import { ConfigService } from "@nestjs/config";
import { RedisService } from "../../../services/redis.service";


@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const redisUrl = config.get<string>('REDIS_URL');

                if (!redisUrl) {
                    throw new Error("Redis URL is not defined in environment variables!");
                }

                const store = new KeyvRedis(redisUrl)

                store.on('error', (err) => {
                    console.error('Redis Connection Error:', err);
                });

                store.on('connect', () => { });

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