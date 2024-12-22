import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'File is required',
        success: false,
      };
    }

    try {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      return {
        status: HttpStatus.OK,
        success: true,
        message: 'File uploaded successfully',
        data: {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'File upload failed',
        error: error.message || 'An error occurred while uploading the file',
      };
    }
  }
}
