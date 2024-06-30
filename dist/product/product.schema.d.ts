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
import { Document, Types, HydratedDocument } from 'mongoose';
import { Testimonial } from './testimonial.schema';
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
    "storage and memory" = 10,
    "smartphones" = 11,
    "tablets" = 12,
    "smartwatches" = 13,
    "home appliances" = 14,
    "kitchen appliances" = 15,
    "personal care" = 16,
    "beauty products" = 17,
    "clothing" = 18,
    "shoes" = 19,
    "books" = 20,
    "toys" = 21,
    "sports equipment" = 22,
    "office supplies" = 23,
    "pet supplies" = 24,
    "automotive parts" = 25,
    "musical instruments" = 26,
    "furniture" = 27,
    "garden tools" = 28,
    "health and wellness" = 29
}
export declare class Product {
    name: string;
    description: string;
    price: number;
    currentInStock: number;
    category: string;
    averageRating: number;
    image: string;
    productType: string;
    testimonials: Testimonial[];
    sizeList: string[];
    cloudinary_id: string;
    createdAt: Date;
    createdBy: Types.ObjectId;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product> & Product & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
}>;
