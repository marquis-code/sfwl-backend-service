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
import { UserDocument } from "../user/user.schema";
import { ProductDocument } from "../product/product.schema";
import { Review, ReviewDocument } from "./review.schema";
import { CreateReviewDto, UpdateReviewDto } from "./review.dto";
export declare class ReviewService {
    private readonly Review;
    private readonly Product;
    constructor(Review: Model<ReviewDocument>, Product: Model<ProductDocument>);
    getReviews(): Promise<{
        reviews: Omit<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Review> & Review & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Review> & Review & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>, never>, never>[];
    }>;
    createReview(dto: CreateReviewDto, user: UserDocument): Promise<{
        review: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Review> & Review & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Review> & Review & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateReview(id: string, dto: UpdateReviewDto, currentUser: UserDocument): Promise<{
        review: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Review> & Review & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Review> & Review & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    deleteReview(id: string, currentUser: UserDocument): Promise<{}>;
    getAverageRating(productId: Types.ObjectId): Promise<any>;
}
