import { SubscriptionPlan } from "../shared/enums";
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    activities?: string[];
    subscriptionPlan?: SubscriptionPlan;
    subscriptionExpiry?: Date;
    role?: UserRole;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    activities?: string[];
    subscriptionPlan?: SubscriptionPlan;
    subscriptionExpiry?: string;
    role?: UserRole;
}
