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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
const review_schema_1 = require("../review/review.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const user_schema_1 = require("../user/user.schema");
const shuffleArray_1 = require("../utils/shuffleArray");
let ProductService = class ProductService {
    constructor(productModel, reviewModel, cloudinary, userModel) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
        this.cloudinary = cloudinary;
        this.userModel = userModel;
    }
    async getProducts() {
        const products = await this.productModel.find().populate("createdBy");
        const shuffledProducts = (0, shuffleArray_1.shuffleArray)(products);
        return { products: shuffledProducts };
    }
    async getProduct(id) {
        const product = await this.productModel.findById(id).populate("reviews");
        if (!product) {
            throw new common_1.NotFoundException("No product found with the entered ID");
        }
        return { product };
    }
    async createProduct(dto, user, file) {
        const cloudinaryResponse = await this.cloudinary.uploadImage(file);
        const productPayload = Object.assign(Object.assign({}, dto), { createdBy: user._id, cloudinary_id: cloudinaryResponse.public_id, image: cloudinaryResponse.url });
        const product = await this.productModel.create(productPayload);
        return { product };
    }
    async updateProduct(id, dto, userId, file) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new common_1.NotFoundException("No product found with the entered ID");
            }
            const userIdObj = new mongoose_2.Types.ObjectId(userId);
            if (!product.createdBy.equals(userIdObj)) {
                throw new common_1.ForbiddenException("You can only edit your own products");
            }
            if (dto.name)
                product.name = dto.name;
            if (dto.description)
                product.description = dto.description;
            if (dto.price)
                product.price = dto.price;
            if (dto.currentInStock)
                product.currentInStock = dto.currentInStock;
            if (dto.category)
                product.category = dto.category;
            if (file) {
                if (product.cloudinary_id) {
                    await this.cloudinary.deleteImage(product.cloudinary_id);
                }
                const cloudinaryResponse = await this.cloudinary.uploadImage(file);
                product.cloudinary_id = cloudinaryResponse.public_id;
                product.image = cloudinaryResponse.url;
            }
            await product.save();
            const updatedProduct = await this.productModel.findById(id);
            console.log('Updated Product:', updatedProduct);
            return { product: updatedProduct };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            console.error('Error updating product:', error);
            throw new common_1.InternalServerErrorException("An error occurred while updating the product");
        }
    }
    async deleteProduct(id, userId) {
        console.log(userId, "userId ggggggg");
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException("No product found with the entered ID");
        }
        const user = await this.userModel.findById(userId);
        console.log(user, "deleter her eooo");
        if (!user || (user.role !== "vendor" && user.role !== "admin")) {
            throw new common_1.ForbiddenException("Only vendors and admins can delete products");
        }
        const userIdObj = new mongoose_2.Types.ObjectId(userId);
        if (user.role === "vendor" && !product.createdBy.equals(userIdObj)) {
            throw new common_1.ForbiddenException("Vendors can only delete their own products");
        }
        if (product.cloudinary_id) {
            await this.cloudinary.deleteImage(product.cloudinary_id);
        }
        await this.productModel.findByIdAndDelete(id);
        await this.reviewModel.deleteMany({ product: product._id });
        return {};
    }
    async getVendorProducts(vendorId) {
        const objectId = new mongoose_2.Types.ObjectId(vendorId);
        const products = await this.productModel.find({ createdBy: objectId }).exec();
        console.log(`Fetched Products for Vendor ID ${vendorId}:`, products);
        return products;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map