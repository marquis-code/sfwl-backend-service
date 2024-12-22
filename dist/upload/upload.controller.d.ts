/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UploadController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
        success: boolean;
        data?: undefined;
        error?: undefined;
    } | {
        status: HttpStatus;
        success: boolean;
        message: string;
        data: {
            url: any;
            public_id: any;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
