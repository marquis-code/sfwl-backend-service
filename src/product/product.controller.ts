// nest.js modules
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Req,
  UseInterceptors,
  NotFoundException,
  UploadedFile,
  Request,
  UseFilters,
  ForbiddenException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role } from "../role/role.enum";
import { Auth } from "../auth/auth.decorator";
import { ProductService } from "./product.service";
import { ProductDto, UpdateProductDto } from "./product.dto";
import { ValidateMongoId } from "../utils/validate-mongoId";
import { FileSizeExceptionFilter } from '../filters/file-size-exception.filter';
@Controller("products")
@UseFilters(FileSizeExceptionFilter)
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  @Auth(Role.Vendor, Role.Admin)
  @UseInterceptors(FileInterceptor("file"))
  async createProduct(
    @Req() req,
    @Body() productDto: ProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const user = req.user;
    if (!file) {
      throw new NotFoundException('File is required');
    }
    return this.productService.createProduct(productDto, user, file);
  }

  @Get("/:id")
  getProduct(@Param("id", ValidateMongoId) id: string) {
    return this.productService.getProduct(id);
  }

  @Put("/:id")
  @Auth(Role.Vendor, Role.Admin)
  @UseInterceptors(FileInterceptor("file"))
  updateProduct(
    @Param("id", ValidateMongoId) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = req.user as any;
    return this.productService.updateProduct(id, updateProductDto, user._id, file);
  }

  @Delete("/:id")
  @Auth(Role.Vendor, Role.Admin)
  deleteProduct(@Param("id", ValidateMongoId) id: string, @Req() req) {
    const user = req.user as any;
    return this.productService.deleteProduct(id, user._id);
  }

  @Get('/vendor/:vendorId')
  async getProductsByVendor(@Param('vendorId') vendorId: string) {
    return this.productService.getVendorProducts(vendorId);
  }
}
