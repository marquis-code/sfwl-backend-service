import { UserDocument } from "../user/user.schema";
import { ReviewService } from "./review.service";
import { CreateReviewDto, UpdateReviewDto } from "./review.dto";
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
    getReviews(): Promise<{
        reviews: Omit<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./review.schema").Review> & import("./review.schema").Review & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./review.schema").Review> & import("./review.schema").Review & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>, never>[];
    }>;
    createReview(dto: CreateReviewDto, user: UserDocument): Promise<{
        review: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./review.schema").Review> & import("./review.schema").Review & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./review.schema").Review> & import("./review.schema").Review & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateReview(id: string, dto: UpdateReviewDto, user: UserDocument): Promise<{
        review: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./review.schema").Review> & import("./review.schema").Review & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./review.schema").Review> & import("./review.schema").Review & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteReview(id: string, user: UserDocument): Promise<{}>;
}
