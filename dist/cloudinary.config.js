"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const configureCloudinary = (configService) => {
    cloudinary_1.v2.config({
        cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
        api_key: configService.get('CLOUDINARY_API_KEY'),
        api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
    return cloudinary_1.v2;
};
exports.configureCloudinary = configureCloudinary;
//# sourceMappingURL=cloudinary.config.js.map