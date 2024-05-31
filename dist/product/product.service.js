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
let ProductService = class ProductService {
    constructor(Product, Review) {
        this.Product = Product;
        this.Review = Review;
    }
    async getProducts() {
        const products = await this.Product.find();
        return { products };
    }
    async getProduct(id) {
        const product = await this.Product.findById(id).populate("reviews");
        if (!product)
            throw new common_1.NotFoundException([
                "No product found with the entered ID",
            ]);
        return { product };
    }
    async createProduct(dto) {
        const product = await this.Product.create(dto);
        return { product };
    }
    async updateProduct(id, dto) {
        const product = await this.Product.findByIdAndUpdate(id, dto, {
            runValidators: true,
            new: true,
        });
        if (!product)
            throw new common_1.NotFoundException([
                "No product found with the entered ID",
            ]);
        return { product };
    }
    async deleteProduct(id) {
        const product = await this.Product.findByIdAndDelete(id);
        if (!product)
            throw new common_1.NotFoundException([
                "No product found with the entered ID",
            ]);
        await this.Review.deleteMany({ product: product._id });
        return {};
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map