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
