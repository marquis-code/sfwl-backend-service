import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Model } from "mongoose";
import { UserDocument } from "../user/user.schema";
export declare class AuthGuard implements CanActivate {
    private readonly User;
    constructor(User: Model<UserDocument>);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
    protected getToken(request: Request): string;
}
