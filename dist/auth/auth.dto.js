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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = exports.UpdatePasswordDto = exports.LoginDto = exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../shared/enums");
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Enter your full name' }),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Enter a valid email address' }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)(null, {}, { message: 'Enter a valid phone number' }),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Enter a password at least 6 characters long' }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Activities must be an array' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Activities must have at least one item' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each activity must be a string' }),
    __metadata("design:type", Array)
], SignupDto.prototype, "activities", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Subscription plan is required' }),
    (0, class_validator_1.IsEnum)(enums_1.SubscriptionPlan, { message: "Subscription plan must be either 'basic' or 'premium'" }),
    __metadata("design:type", String)
], SignupDto.prototype, "subscriptionPlan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Subscription expiry must be a valid date' }),
    __metadata("design:type", Date)
], SignupDto.prototype, "subscriptionExpiry", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Enter a valid email" }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Enter a password" }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class UpdatePasswordDto {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Enter current password" }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, { message: "Enter new password atleast 6 characters long" }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.MinLength)(6, { message: "Enter a password atleast 6 characters long" }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
//# sourceMappingURL=auth.dto.js.map