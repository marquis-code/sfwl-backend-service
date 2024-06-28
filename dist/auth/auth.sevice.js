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
exports.AuthService = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sendEmail_1 = require("../utils/sendEmail");
const user_schema_1 = require("../user/user.schema");
const wallet_service_1 = require("../wallet/wallet.service");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(User, walletService) {
        this.User = User;
        this.walletService = walletService;
    }
    async signup(dto) {
        if (!dto.location) {
            throw new common_1.BadRequestException('Location is required! Please turn on your location to signup.');
        }
        let user = await this.User.findOne({
            email: dto.email,
        });
        if (user)
            throw new common_1.ConflictException([
                "A user already exists with the entered email",
            ]);
        user = new this.User(dto);
        const savedUser = await user.save();
        const walletId = await this.walletService.createWallet(savedUser._id.toString());
        user.walletId = walletId;
        await user.save();
        user.password = undefined;
        return { user };
    }
    async login(dto) {
        const user = await this.User.findOne({
            email: dto.email,
        }).select("+password");
        if (!user)
            throw new common_1.NotFoundException(["No user exists with the entered email"]);
        const isMatch = await user.matchPassword(dto.password);
        if (!isMatch)
            throw new common_1.BadRequestException(["Invalid password"]);
        user.password = undefined;
        return { token: user.getSignedJwtToken(), user };
    }
    async updatePassword(dto, currentUser) {
        const user = await this.User.findById(currentUser.id).select("+password");
        const isMatch = await user.matchPassword(dto.password);
        if (!isMatch)
            throw new common_1.BadRequestException(["Invalid password"]);
        user.password = dto.newPassword;
        await user.save();
        user.password = undefined;
        return { user };
    }
    async forgotPassword(req, email) {
        const user = await this.User.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException(["No user exists with the entered email"]);
        const token = user.getResetPasswordToken();
        await user.save();
        const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password?token=${token}`;
        const message = `Dear ${user.name}, <br /><br />We have received your request for a password reset. Please use the following link to reset your password: <a href="${resetURL}" target="_blank">${resetURL}</a><br /><br />Please note that this link will expire in 10 minutes for security purposes, so please reset your password as soon as possible. If you do not reset your password within the given time, you will need to request a new password reset link.<br /><br />If you did not request a password reset, please ignore this email.<br /><br />Thank you, <br />MK Store`;
        try {
            await (0, sendEmail_1.sendEmail)({
                subject: "Password reset link - Expires in 10 minutes",
                to: email,
                html: message,
            });
        }
        catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            throw new common_1.InternalServerErrorException(["Email could not be sent"]);
        }
        return { message: "Please check your email" };
    }
    async resetPassword(dto, token) {
        if (!token)
            throw new common_1.BadRequestException([
                "Invalid password reset token",
                "Request a new password reset link",
            ]);
        const resetPasswordToken = (0, crypto_1.createHash)("sha256")
            .update(token)
            .digest("base64");
        const user = await this.User.findOne({ resetPasswordToken }).select("+resetPasswordExpire");
        if (!user)
            throw new common_1.BadRequestException([
                "Invalid password reset token",
                "Request a new password reset link",
            ]);
        if (Date.now() > user.resetPasswordExpire) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            throw new common_1.BadRequestException([
                "Password reset token expired",
                "Request a new password reset link",
            ]);
        }
        user.password = dto.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        user.password = undefined;
        return { user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        wallet_service_1.WalletService])
], AuthService);
//# sourceMappingURL=auth.sevice.js.map