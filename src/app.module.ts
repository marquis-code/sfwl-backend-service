import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AuthMoudle } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { UserModule } from "./user/user.module";
import { ImageModule } from "./image/image.module";
import { MulterModule } from '@nestjs/platform-express';

import { CloudinaryService } from './cloudinary/cloudinary.service';
import { configureCloudinary } from './cloudinary.config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as multer from 'multer';

import { join } from "path";
import { OrderModule } from "./order/orders.module";
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
	 MulterModule.register({
		storage: multer.memoryStorage(),
	  }),
    CloudinaryModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ThrottlerModule.forRoot([
      {
        ttl: 100 * 60,
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
    ProductModule,
    ReviewModule,
    OrderModule,
    NotificationModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    CloudinaryService,
    {
      provide: "Cloudinary",
      useFactory: configureCloudinary,
      inject: [ConfigService],
    },
    NotificationGateway, NotificationService
  ],
})
export class AppModule {}
