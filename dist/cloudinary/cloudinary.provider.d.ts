import { v2 as cloudinary } from 'cloudinary';
export declare const CloudinaryProvider: {
    provide: string;
    useFactory: () => typeof cloudinary;
};
