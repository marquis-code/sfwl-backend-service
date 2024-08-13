/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { ReviewDocument } from "../review/review.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { ProductDto, UpdateProductDto } from "./product.dto";
import { UserDocument } from "../user/user.schema";
import { CacheService } from '../cache/cache.service';
export declare class ProductService {
    private readonly productModel;
    private readonly reviewModel;
    private readonly cloudinary;
    private readonly userModel;
    private readonly cacheService;
    constructor(productModel: Model<ProductDocument>, reviewModel: Model<ReviewDocument>, cloudinary: CloudinaryService, userModel: Model<UserDocument>, cacheService: CacheService);
    getProducts(): Promise<{
        products: any;
        fromCache: boolean;
    }>;
    getProduct(id: string): Promise<{
        product: any;
        fromCache: boolean;
    }>;
    createProduct(dto: ProductDto, user: any, file: any): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateProduct(id: string, dto: UpdateProductDto, userId: string, file?: any): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteProduct(id: string, userId: string): Promise<{}>;
    getVendorProducts(vendorId: string): Promise<Product[]>;
}
