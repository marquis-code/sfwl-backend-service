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
exports.ProductSchema = exports.Product = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var Category;
(function (Category) {
    Category[Category["desktops"] = 0] = "desktops";
    Category[Category["computer accessories"] = 1] = "computer accessories";
    Category[Category["laptops"] = 2] = "laptops";
    Category[Category["laptop parts"] = 3] = "laptop parts";
    Category[Category["cctv"] = 4] = "cctv";
    Category[Category["printers and scanners"] = 5] = "printers and scanners";
    Category[Category["networking and wifi"] = 6] = "networking and wifi";
    Category[Category["gaming"] = 7] = "gaming";
    Category[Category["snacks"] = 8] = "snacks";
    Category[Category["groceries"] = 9] = "groceries";
    Category[Category["storage and memory"] = 10] = "storage and memory";
})(Category || (exports.Category = Category = {}));
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 2000 }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0, min: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1, min: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "currentInStock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Category }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "averageRating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "cloudinary_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "createdBy", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
});
//# sourceMappingURL=product.schema.js.map