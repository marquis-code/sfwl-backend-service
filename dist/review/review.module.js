"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const product_module_1 = require("../product/product.module");
const review_controller_1 = require("./review.controller");
const review_schema_1 = require("./review.schema");
const review_service_1 = require("./review.service");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            mongoose_1.MongooseModule.forFeature([
                { name: review_schema_1.Review.name, schema: review_schema_1.ReviewSchema },
            ]),
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                { name: review_schema_1.Review.name, schema: review_schema_1.ReviewSchema },
            ]),
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map