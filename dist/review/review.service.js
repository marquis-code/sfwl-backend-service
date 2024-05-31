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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../product/product.schema");
const review_schema_1 = require("./review.schema");
let ReviewService = class ReviewService {
    constructor(Review, Product) {
        this.Review = Review;
        this.Product = Product;
    }
    async getReviews() {
        const reviews = await this.Review.find()
            .populate({ path: "user", select: "id name" })
            .populate({ path: "product", select: "id name" });
        return { reviews };
    }
    async createReview(dto, user) {
        let review = await this.Review.findOne({
            user: new mongoose_2.Types.ObjectId(user.id),
            product: new mongoose_2.Types.ObjectId(dto.product),
        });
        if (review)
            throw new common_1.BadRequestException([
                "A user can not create more than one review for a product",
            ]);
        review = await this.Review.create(Object.assign(Object.assign({}, dto), { product: new mongoose_2.Types.ObjectId(dto.product), user: new mongoose_2.Types.ObjectId(user.id) }));
        await this.Product.findByIdAndUpdate(review.product, {
            averageRating: await this.getAverageRating(review.product),
        });
        await review.populate({ path: "user", select: "id name" });
        await review.populate({ path: "product", select: "id name" });
        return { review };
    }
    async updateReview(id, dto, currentUser) {
        const review = await this.Review.findById(id);
        if (!review)
            throw new common_1.NotFoundException(["No review found with the entered ID"]);
        if (currentUser.id !== review.user.toString())
            throw new common_1.ForbiddenException([
                "The current user can't access this resource",
            ]);
        review.title = dto.title;
        review.text = dto.text;
        review.rating = dto.rating;
        await review.save();
        await this.Product.findByIdAndUpdate(review.product, {
            averageRating: await this.getAverageRating(review.product),
        });
        await review.populate({ path: "user", select: "id name" });
        await review.populate({ path: "product", select: "id name" });
        return { review };
    }
    async deleteReview(id, currentUser) {
        const review = await this.Review.findById(id);
        if (!review)
            throw new common_1.NotFoundException(["No review found with the entered ID"]);
        if (currentUser.id !== review.user.toString())
            throw new common_1.ForbiddenException([
                "The current user can't access this resource",
            ]);
        await review.deleteOne();
        await this.Product.findByIdAndUpdate(review.product, {
            averageRating: await this.getAverageRating(review.product),
        });
        return {};
    }
    async getAverageRating(productId) {
        const result = await this.Review.aggregate([
            {
                $match: { product: productId },
            },
            {
                $group: {
                    _id: "$product",
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);
        if (result[0]) {
            return result[0].averageRating;
        }
        else {
            return 0;
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ReviewService);
//# sourceMappingURL=review.service.js.map