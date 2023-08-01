import { CacheRepository } from "src/domain/repositories";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class RedisRepository implements CacheRepository {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async get(key: string): Promise<unknown> {
        return this.cacheManager.get(key);
    }

    async set(key: string, value: unknown, ttl?: number): Promise<void> {
        this.cacheManager.set(key, value, ttl);
    }

    async del(key: string): Promise<void> {
        this.cacheManager.del(key);
    }

}