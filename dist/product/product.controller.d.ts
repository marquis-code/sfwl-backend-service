/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ProductService } from "./product.service";
import { ProductDto, UpdateProductDto } from "./product.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(): Promise<{
        products: any;
        fromCache: boolean;
    }>;
    createProduct(req: any, productDto: ProductDto, file: Express.Multer.File): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getProduct(id: string): Promise<{
        product: any;
        fromCache: boolean;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto, req: any, file?: Express.Multer.File): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteProduct(id: string, req: any): Promise<{}>;
    getProductsByVendor(vendorId: string): Promise<import("./product.schema").Product[]>;
}
