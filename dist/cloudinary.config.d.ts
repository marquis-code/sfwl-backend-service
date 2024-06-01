import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
export declare const configureCloudinary: (configService: ConfigService) => typeof cloudinary;
