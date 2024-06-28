import { Types } from "mongoose";
export declare class CreateReviewDto {
    title: string;
    text: string;
    rating: number;
    product: Types.ObjectId;
}
export declare class UpdateReviewDto {
    title: string;
    text: string;
    rating: number;
}
