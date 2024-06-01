import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class FileSizeExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    // Check if the exception is related to file size
    if (message.includes('File size too large')) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'File size too large. Maximum allowed size is 10MB.',
        error: 'Bad Request'
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: message,
        error: status !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.name : 'Internal Server Error',
      });
    }
  }
}
