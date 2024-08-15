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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const role_enum_1 = require("../role/role.enum");
const auth_decorator_1 = require("../auth/auth.decorator");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./product.dto");
const validate_mongoId_1 = require("../utils/validate-mongoId");
const file_size_exception_filter_1 = require("../filters/file-size-exception.filter");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts() {
        return this.productService.getProducts();
    }
    async createProduct(req, productDto, file) {
        console.log('Received create product request');
        console.log('User:', req.user);
        console.log('Product DTO:', productDto);
        if (!file) {
            console.log('No file uploaded');
            throw new common_1.NotFoundException('File is required');
        }
        console.log('Uploaded File:', file);
        try {
            const response = await this.productService.createProduct(productDto, req.user, file);
            console.log('Product created successfully:', response);
            return response;
        }
        catch (error) {
            console.error('Error creating product:', error.message);
            throw new common_1.BadRequestException('Unable to create product. Please check your input.');
        }
    }
    getProduct(id) {
        return this.productService.getProduct(id);
    }
    updateProduct(id, updateProductDto, req, file) {
        console.log('Received update product request for ID:', id);
        console.log('User:', req.user);
        console.log('Update Product DTO:', updateProductDto);
        return this.productService.updateProduct(id, updateProductDto, req.user._id, file);
    }
    deleteProduct(id, req) {
        console.log('Received delete product request for ID:', id);
        console.log('User:', req.user);
        return this.productService.deleteProduct(id, req.user._id);
    }
    async getProductsByVendor(vendorId) {
        console.log(`Fetching products for vendor ID: ${vendorId}`);
        const products = await this.productService.getVendorProducts(vendorId);
        if (!products) {
            throw new common_1.NotFoundException(`No products found for vendor ID ${vendorId}`);
        }
        return products;
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Vendor, role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", validate_mongoId_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Vendor, role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Param)("id", validate_mongoId_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Vendor, role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)("id", validate_mongoId_1.ValidateMongoId)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)("/vendor/:vendorId"),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Vendor, role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)("vendorId", validate_mongoId_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByVendor", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)("products"),
    (0, common_1.UseFilters)(file_size_exception_filter_1.FileSizeExceptionFilter),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map