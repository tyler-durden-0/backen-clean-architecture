import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from 'cache-manager-redis-store';
import { Module } from "@nestjs/common";

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            // @ts-ignore
            store: async () => await redisStore({
              // Store-specific configuration:
              socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
                // host: 'redis-stack',
                // port: 6379,
              }
            })
          }),
    ],
  })
  export class RedisConfigModule {}