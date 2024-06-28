import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from "./product.schema";
import { ReviewDocument } from "../review/review.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { ProductDto, UpdateProductDto } from "./product.dto";
import { UserDocument } from '../user/user.schema';
export declare class ProductService {
    private readonly productModel;
    private readonly reviewModel;
    private readonly cloudinary;
    private readonly userModel;
    constructor(productModel: Model<ProductDocument>, reviewModel: Model<ReviewDocument>, cloudinary: CloudinaryService, userModel: Model<UserDocument>);
    getProducts(): Promise<{
        products: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
    }>;
    getProduct(id: string): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
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
