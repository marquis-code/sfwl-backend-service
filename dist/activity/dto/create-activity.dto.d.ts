declare class ActivityItemDto {
    name: string;
    image: string;
}
export declare class CreateActivityDto {
    date: string;
    activity: ActivityItemDto[];
    meals: ActivityItemDto[];
}
export {};
