import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
import { Role } from "../role/role.enum";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: Role;
    resetPasswordToken: string;
    walletId: string;
    homeAddress?: string;
    cityOfResidence?: string;
    businessName?: string;
    businessEmail?: string;
    businessPhone?: string;
    cacRegistration?: string;
    businessLocation?: string;
    resetPasswordExpire: number;
    createdAt: Date;
    getSignedJwtToken: Function;
    matchPassword: Function;
    getResetPasswordToken: Function;
    location: {
        type: string;
        coordinates: number[];
    };
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
