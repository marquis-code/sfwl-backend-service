import { HydratedDocument, Types } from "mongoose";
import { User } from "../user/user.schema";
import { Product } from "../product/product.schema";
export type ReviewDocument = HydratedDocument<Review>;
export declare class Review {
    title: string;
    text: string;
    rating: number;
    user: Types.ObjectId & User;
    product: Types.ObjectId & Product;
    createdAt: Date;
}
export declare const ReviewSchema: import("mongoose").Schema<Review, import("mongoose").Model<Review, any, any, any, import("mongoose").Document<unknown, any, Review> & Review & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Review>> & import("mongoose").FlatRecord<Review> & {
    _id: Types.ObjectId;
}>;
