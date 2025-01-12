import { SubscriptionPlan } from "../shared/enums";
export declare class SignupDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    activities: string[];
    subscriptionPlan: SubscriptionPlan;
    subscriptionExpiry: Date;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdatePasswordDto {
    password: string;
    newPassword: string;
}
export declare class ResetPasswordDto {
    password: string;
}
