import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AuthMoudle } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ImageModule } from "./image/image.module";
import { MulterModule } from "@nestjs/platform-express";

import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { configureCloudinary } from "./cloudinary.config";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { UploadModule } from './upload/upload.module';
import { ActivityModule } from './activity/activity.module';
import * as multer from "multer";

import { join } from "path";

import { CacheConfigModule } from "./cache/cache.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheConfigModule,
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    CloudinaryModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported here
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        // ttl: 100 * 60,
        ttl: 60,
        limit: 100,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
      serveStaticOptions: { index: false },
    }),
    ImageModule,
    UserModule,
    AuthMoudle,
    UploadModule,
    ActivityModule
  ],
  providers: [
    // { provide: APP_GUARD, useClass: ThrottlerGuard },
    CloudinaryService,
    {
      provide: "Cloudinary",
      useFactory: configureCloudinary,
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}
