import { ProductService } from "./product.service";
import { ProductDto, UpdateProductDto } from "./product.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(): Promise<{
        products: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
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
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./product.schema").Product> & import("./product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
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
