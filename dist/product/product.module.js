"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_controller_1 = require("./product.controller");
const product_schema_1 = require("./product.schema");
const product_service_1 = require("./product.service");
const user_module_1 = require("../user/user.module");
const review_module_1 = require("../review/review.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const orders_module_1 = require("../order/orders.module");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => review_module_1.ReviewModule),
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
            cloudinary_module_1.CloudinaryModule,
            orders_module_1.OrderModule
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map