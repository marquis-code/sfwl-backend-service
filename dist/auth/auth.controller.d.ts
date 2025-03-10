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
import { Request } from "express";
import { UserDocument } from "../user/user.schema";
import { SignupDto, LoginDto, UpdatePasswordDto, ResetPasswordDto } from "./auth.dto";
import { AuthService } from "./auth.sevice";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        user: import("../user/user.schema").User;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, UserDocument> & import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            matchPassword: (password: string) => Promise<boolean>;
            getSignedJwtToken: () => string;
            getResetPasswordToken: () => string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getCurrentUser(user: UserDocument): {
        user: UserDocument;
    };
    updatePassword(dto: UpdatePasswordDto, user: UserDocument): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDocument> & import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
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
        user: import("mongoose").Document<unknown, {}, UserDocument> & import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
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
