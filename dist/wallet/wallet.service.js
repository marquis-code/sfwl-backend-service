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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_schema_1 = require("./wallet.schema");
const order_schema_1 = require("../order/order.schema");
let WalletService = class WalletService {
    constructor(walletModel, orderModel, connection) {
        this.walletModel = walletModel;
        this.orderModel = orderModel;
        this.connection = connection;
    }
    async createWallet(userId) {
        const newWallet = new this.walletModel({ userId, balance: 0 });
        const savedWallet = await newWallet.save();
        return savedWallet._id;
    }
    async creditWallet(userId, amount) {
        await this.walletModel.updateOne({ userId }, { $inc: { balance: amount } });
    }
    async handleOrderCompletion(orderId) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const order = await this.orderModel.findById(orderId).exec();
            if (order && order.status === 'delivered') {
                const erranderShare = order.erranderId ? order.totalPrice * 0.05 : 0;
                if (erranderShare > 0) {
                    await this.walletModel.updateOne({ userId: order.erranderId }, { $inc: { balance: erranderShare } }, { session });
                }
                for (const item of order.items) {
                    const vendorShare = item.price * 0.95;
                    await this.walletModel.updateOne({ userId: item.vendorId }, { $inc: { balance: vendorShare } }, { session });
                }
            }
            await session.commitTransaction();
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async acceptOrder(orderId, erranderId) {
        await this.orderModel.updateOne({ _id: orderId }, { $set: { erranderId, status: 'accepted' } });
    }
    async markOrderAsDelivered(orderId) {
        await this.orderModel.updateOne({ _id: orderId }, { $set: { status: 'delivered' } });
        await this.handleOrderCompletion(orderId);
    }
    async getTransactionsForVendor(vendorId) {
        return this.orderModel.find({ 'items.vendorId': vendorId, status: 'delivered' }).exec();
    }
    async getOrdersForErrander(erranderId) {
        return this.orderModel.find({ erranderId }).exec();
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(2, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection])
], WalletService);
//# sourceMappingURL=wallet.service.js.map