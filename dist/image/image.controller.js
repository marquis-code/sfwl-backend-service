"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const role_enum_1 = require("../role/role.enum");
const auth_decorator_1 = require("../auth/auth.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common/");
const randomString_1 = require("../utils/randomString");
const path_1 = require("path");
let ImageController = class ImageController {
    uploadImage(image) {
        return {
            image: image.filename,
        };
    }
};
exports.ImageController = ImageController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}-${(0, randomString_1.generateString)(10)}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_2.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: "^image/(jpg|jpeg|png|bmp|webp)$",
    })
        .addMaxSizeValidator({
        maxSize: 2 * 1000 * 1000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImageController.prototype, "uploadImage", null);
exports.ImageController = ImageController = __decorate([
    (0, common_1.Controller)("images")
], ImageController);
//# sourceMappingURL=image.controller.js.map