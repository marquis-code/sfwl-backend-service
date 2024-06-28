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
