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
  Patch,
  UseInterceptors,
  NotFoundException,
  UploadedFile,
  Request,
  UseFilters,
  ForbiddenException,
  BadRequestException
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
    console.log('Received create product request');
    console.log('User:', req.user);
    console.log('Product DTO:', productDto);

    if (!file) {
      console.log('No file uploaded');
      throw new NotFoundException('File is required');
    }
    console.log('Uploaded File:', file);

    // return this.productService.createProduct(productDto, req.user, file);
    try {
      const response = await this.productService.createProduct(productDto, req.user, file);
      console.log('Product created successfully:', response);
      return response;
    } catch (error) {
      console.error('Error creating product:', error.message);
      throw new BadRequestException('Unable to create product. Please check your input.');
    }

  }

  @Get("/:id")
  getProduct(@Param("id", ValidateMongoId) id: string) {
    console.log('Received get product request for ID:', id);
    return this.productService.getProduct(id);
  }

  // @Put("/:id")
  // @Auth(Role.Vendor, Role.Admin)
  // @UseInterceptors(FileInterceptor("file"))
  // updateProduct(
  //   @Param("id", ValidateMongoId) id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  //   @Req() req,
  //   @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   console.log('Received update product request for ID:', id);
  //   console.log('User:', req.user);
  //   console.log('Update Product DTO:', updateProductDto);

  //   return this.productService.updateProduct(id, updateProductDto, req.user._id, file);
  // }
  @Patch("/:id")
  @Auth(Role.Vendor, Role.Admin)
  @UseInterceptors(FileInterceptor("file"))
  async updateProduct(
    @Param("id", ValidateMongoId) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Received update product request for ID:', id);
    console.log('User:', req.user);
    console.log('Update Product DTO:', updateProductDto);
  
    const updatedProduct = await this.productService.updateProduct(id, updateProductDto, req.user._id, file);
  
    // Check if the product was updated successfully
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  
    return updatedProduct;
  }


  @Delete("/:id")
  @Auth(Role.Vendor, Role.Admin)
  deleteProduct(@Param("id", ValidateMongoId) id: string, @Req() req) {
    console.log('Received delete product request for ID:', id);
    console.log('User:', req.user);

    return this.productService.deleteProduct(id, req.user._id);
  }

  // @Get('/vendor/:vendorId')
  // async getProductsByVendor(@Param('vendorId') vendorId: string) {
  //   console.log('Received get products by vendor request for vendor ID:', vendorId);
  //   return this.productService.getVendorProducts(vendorId);
  // }
  @Get("/vendor/:vendorId")
  @Auth(Role.Vendor, Role.Admin)
  async getProductsByVendor(@Param("vendorId", ValidateMongoId) vendorId: string) {
    console.log(`Fetching products for vendor ID: ${vendorId}`);

    const products = await this.productService.getVendorProducts(vendorId);

    if (!products) {
      throw new NotFoundException(`No products found for vendor ID ${vendorId}`);
    }

    return products;
  }
}
