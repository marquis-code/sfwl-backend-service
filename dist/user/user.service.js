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
const role_enum_1 = require("../role/role.enum");
const user_schema_1 = require("./user.schema");
const review_schema_1 = require("../review/review.schema");
const wallet_service_1 = require("../wallet/wallet.service");
const product_schema_1 = require("../product/product.schema");
let UserService = class UserService {
    constructor(User, Review, Product, walletService) {
        this.User = User;
        this.Review = Review;
        this.Product = Product;
        this.walletService = walletService;
    }
    async getUsers() {
        const users = await this.User.find();
        return { users };
    }
    async createUser(dto) {
        let user = await this.User.findOne({ email: dto.email });
        if (user) {
            throw new common_1.ConflictException(["A user already exists with the entered email"]);
        }
        user = new this.User(dto);
        const savedUser = await user.save();
        const wallet = await this.walletService.createWallet(savedUser._id.toString());
        savedUser.wallet = wallet;
        await savedUser.save();
        const populatedUser = await this.User.findById(savedUser._id).populate('wallet').exec();
        populatedUser.password = undefined;
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
        user.role = currentUser.role === role_enum_1.Role.Admin ? dto.role : user.role;
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
        await this.Review.deleteMany({ user: user._id });
        return {};
    }
    async getVendorsWithProducts() {
        const vendors = await this.User.find({ role: role_enum_1.Role.Vendor }).exec();
        const vendorIds = vendors.map((vendor) => vendor._id);
        const products = await this.Product.find({ createdBy: { $in: vendorIds } }).exec();
        const vendorsWithProducts = vendors.map((vendor) => {
            const vendorProducts = products.filter((product) => product.createdBy.equals(vendor._id));
            return Object.assign(Object.assign({}, vendor.toObject()), { products: vendorProducts });
        });
        return { vendors: vendorsWithProducts };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        wallet_service_1.WalletService])
], UserService);
//# sourceMappingURL=user.service.js.map