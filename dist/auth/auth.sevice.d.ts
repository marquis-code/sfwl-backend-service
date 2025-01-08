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
import { Model } from "mongoose";
import { Request } from "express";
import { User, UserDocument } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { SignupDto, LoginDto, UpdatePasswordDto, ResetPasswordDto } from "./auth.dto";
export declare class AuthService {
    private readonly User;
    private readonly userService;
    constructor(User: Model<UserDocument>, userService: UserService);
    signup(dto: SignupDto): Promise<{
        user: User;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, UserDocument> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            matchPassword: (password: string) => Promise<boolean>;
            getSignedJwtToken: () => string;
            getResetPasswordToken: () => string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    forgotPassword(req: Request, email: string): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto, token: string): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDocument> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            matchPassword: (password: string) => Promise<boolean>;
            getSignedJwtToken: () => string;
            getResetPasswordToken: () => string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updatePassword(dto: UpdatePasswordDto, currentUser: UserDocument): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDocument> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            matchPassword: (password: string) => Promise<boolean>;
            getSignedJwtToken: () => string;
            getResetPasswordToken: () => string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
