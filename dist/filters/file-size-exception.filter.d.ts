import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class FileSizeExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
