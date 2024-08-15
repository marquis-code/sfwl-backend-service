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
import { Role } from "../role/role.enum";
import { User, UserDocument } from "./user.schema";
import { ReviewDocument } from "../review/review.schema";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { WalletService } from "../wallet/wallet.service";
import { Product, ProductDocument } from '../product/product.schema';
export declare class UserService {
    private readonly User;
    private readonly Review;
    private readonly Product;
    private readonly walletService;
    constructor(User: Model<UserDocument>, Review: Model<ReviewDocument>, Product: Model<ProductDocument>, walletService: WalletService);
    getUsers(): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    createUser(dto: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getUser(id: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateUser(id: string, dto: UpdateUserDto, currentUser: UserDocument): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteUser(id: string, currentUser: UserDocument): Promise<{}>;
    getVendorsWithProducts(): Promise<{
        vendors: {
            products: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
                _id: import("mongoose").Types.ObjectId;
            }> & import("mongoose").Document<unknown, {}, Product> & Product & {
                _id: import("mongoose").Types.ObjectId;
            } & Required<{
                _id: import("mongoose").Types.ObjectId;
            }>)[];
            _id: import("mongoose").Types.ObjectId;
            __v?: any;
            $locals: Record<string, unknown>;
            $op: "remove" | "save" | "validate";
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
                [x: string]: any;
            }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
                [x: string]: any;
            }>> & import("mongoose").FlatRecord<{
                [x: string]: any;
            }> & Required<{
                _id: unknown;
            }>>;
            name: string;
            referral?: string;
            email: string;
            password: string;
            phone: string;
            role: Role;
            resetPasswordToken: string;
            wallet: import("mongoose").Types.ObjectId;
            accountNumber?: string;
            bankName?: string;
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
        }[];
    }>;
}
