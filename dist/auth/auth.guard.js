"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let AuthGuard = class AuthGuard {
    constructor(User) {
        this.User = User;
    }
    async canActivate(ctx) {
        const request = ctx.switchToHttp().getRequest();
        try {
            const token = this.getToken(request);
            const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            const user = await this.User.findById(decodedToken.id);
            if (!user)
                throw new common_1.UnauthorizedException([
                    "User not found",
                    "Please login again",
                ]);
            request.user = user;
            return true;
        }
        catch (err) {
            switch (err.name) {
                case "UnauthorizedException":
                    throw err;
                case "TokenExpiredError":
                    throw new common_1.UnauthorizedException([
                        "Login token expired",
                        "Please login again",
                    ]);
                case "JsonWebTokenError":
                    throw new common_1.UnauthorizedException([
                        "Ivalid login token",
                        "Please login again",
                    ]);
                default:
                    throw new common_1.UnauthorizedException([
                        "Not authorized to access this resource",
                    ]);
            }
        }
    }
    getToken(request) {
        const authorization = request.headers.authorization;
        if (!(authorization && authorization.startsWith("Bearer")))
            throw new Error("Invalid Authorization Header");
        const token = authorization.split(" ")[1];
        return token;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map