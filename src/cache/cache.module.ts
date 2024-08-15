import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('CACHE_TTL'),
        auth_pass: configService.get('REDIS_PASSWORD'), // Add this line for Redis authentication
      }),
    }),
    ConfigModule,
  ],
  providers: [
    CacheService,
  ],
  exports: [CacheModule, CacheService],
})
export class CacheConfigModule {}
