import { HydratedDocument } from "mongoose";
import { Document, Types } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;
export declare enum Category {
    "desktops" = 0,
    "computer accessories" = 1,
    "laptops" = 2,
    "laptop parts" = 3,
    "cctv" = 4,
    "printers and scanners" = 5,
    "networking and wifi" = 6,
    "gaming" = 7,
    "snacks" = 8,
    "groceries" = 9,
    "storage and memory" = 10
}
export declare class Product {
    name: string;
    description: string;
    price: number;
    currentInStock: number;
    category: string;
    averageRating: number;
    image: string;
    cloudinary_id: string;
    createdAt: Date;
    createdBy: Types.ObjectId;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product> & Product & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
}>;
