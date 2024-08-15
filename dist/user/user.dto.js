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
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../role/role.enum");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: "Enter a name",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "referral", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Enter a valid email" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, { message: "Enter a password at least 6 characters long" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)(null, {}, { message: "Enter a valid phone number" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_enum_1.Role, { message: "Enter a valid role" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter home address",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "homeAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter home address",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter home address",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "bankName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter city of residence",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "cityOfResidence", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business name",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "businessName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business email",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "businessEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business phone",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "businessPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a CAC registration",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "cacRegistration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business location",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "businessLocation", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: "Enter a name",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)(null, {}, { message: "Enter a valid phone number" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_enum_1.Role, { each: true, message: "Enter a valid role" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business name",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "businessName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business email",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "businessEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business phone",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "businessPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a CAC registration",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "cacRegistration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter a business location",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "businessLocation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter home address",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "homeAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: "Enter city of residence",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "cityOfResidence", void 0);
//# sourceMappingURL=user.dto.js.map