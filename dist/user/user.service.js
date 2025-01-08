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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let UserService = class UserService {
    constructor(User) {
        this.User = User;
    }
    async getUsers() {
        const users = await this.User.find();
        return { users };
    }
    async createUser(createUserDto) {
        let existingUser = await this.User.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new common_1.ConflictException(["A user already exists with the entered email"]);
        }
        const currentDate = new Date();
        const subscriptionExpiry = new Date(currentDate.setDate(currentDate.getDate() + 60));
        const user = new this.User(Object.assign(Object.assign({}, createUserDto), { activities: createUserDto.activities || [], subscriptionExpiry }));
        const savedUser = await user.save();
        if (savedUser) {
            savedUser.password = undefined;
        }
        return { user: savedUser };
    }
    async getUser(id) {
        const user = await this.User.findById(id).populate('wallet').exec();
        ;
        if (!user)
            throw new common_1.NotFoundException(["No user found with the entered ID"]);
        return { user };
    }
    async updateUser(id, dto, currentUser) {
        const user = await this.User.findById(id);
        if (!user)
            throw new common_1.NotFoundException(["No user found with the entered ID"]);
        if (currentUser.id !== user.id)
            throw new common_1.ForbiddenException([
                "The current user can't access this resource",
            ]);
        user.name = dto.name;
        user.phone = dto.phone;
        await user.save();
        return { user };
    }
    async deleteUser(id, currentUser) {
        const user = await this.User.findById(id);
        if (!user)
            throw new common_1.NotFoundException(["No user found with the entered ID"]);
        if (currentUser.id !== user.id)
            throw new common_1.ForbiddenException([
                "The current user can't access this resource",
            ]);
        await user.deleteOne();
        return {};
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map