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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Title should not be empty" }),
    (0, class_validator_1.MaxLength)(100, {
        message: "Enter a review title not more than 100 characters",
    }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Text should not be empty" }),
    (0, class_validator_1.MaxLength)(500, {
        message: "Enter a review text not more than 500 characters",
    }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: "Enter a valid rating from 1 to 5" }),
    (0, class_validator_1.Max)(5, { message: "Enter a valid rating from 1 to 5" }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: "Invalid Product ID" }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReviewDto.prototype, "product", void 0);
class UpdateReviewDto {
}
exports.UpdateReviewDto = UpdateReviewDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Title should not be empty" }),
    (0, class_validator_1.MaxLength)(100, {
        message: "Enter a review title not more than 100 characters",
    }),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(500, {
        message: "Enter a review text not more than 500 characters",
    }),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: "Enter a valid rating from 1 to 5" }),
    (0, class_validator_1.Max)(5, { message: "Enter a valid rating from 1 to 5" }),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
//# sourceMappingURL=review.dto.js.map