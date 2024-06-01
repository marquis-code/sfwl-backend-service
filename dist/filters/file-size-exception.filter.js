"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSizeExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let FileSizeExceptionFilter = class FileSizeExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message;
        if (message.includes('File size too large')) {
            response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'File size too large. Maximum allowed size is 10MB.',
                error: 'Bad Request'
            });
        }
        else {
            response.status(status).json({
                statusCode: status,
                message: message,
                error: status !== common_1.HttpStatus.INTERNAL_SERVER_ERROR ? exception.name : 'Internal Server Error',
            });
        }
    }
};
exports.FileSizeExceptionFilter = FileSizeExceptionFilter;
exports.FileSizeExceptionFilter = FileSizeExceptionFilter = __decorate([
    (0, common_1.Catch)()
], FileSizeExceptionFilter);
//# sourceMappingURL=file-size-exception.filter.js.map