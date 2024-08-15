"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheConfigModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const redisStore = require("cache-manager-redis-store");
const cache_service_1 = require("./cache.service");
let CacheConfigModule = class CacheConfigModule {
};
exports.CacheConfigModule = CacheConfigModule;
exports.CacheConfigModule = CacheConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    store: redisStore,
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    ttl: configService.get('CACHE_TTL'),
                    auth_pass: configService.get('REDIS_PASSWORD'),
                }),
            }),
            config_1.ConfigModule,
        ],
        providers: [
            cache_service_1.CacheService,
        ],
        exports: [cache_manager_1.CacheModule, cache_service_1.CacheService],
    })
], CacheConfigModule);
//# sourceMappingURL=cache.module.js.map