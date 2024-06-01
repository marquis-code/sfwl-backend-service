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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const product_schema_1 = require("../product/product.schema");
const notification_service_1 = require("../notification/notification.service");
const user_schema_1 = require("../user/user.schema");
let OrderService = class OrderService {
    constructor(orderModel, productModel, userModel, notificationService) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.userModel = userModel;
        this.notificationService = notificationService;
    }
    async createOrder(dto) {
        const items = await Promise.all(dto.items.map(async (item) => {
            const product = await this.productModel.findById(item.product);
            if (!product)
                throw new common_1.NotFoundException(`Product not found: ${item.product}`);
            if (product.currentInStock < item.quantity) {
                throw new common_1.BadRequestException(`Not enough stock available for product: ${item.product}`);
            }
            product.currentInStock -= item.quantity;
            await product.save();
            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price,
            };
        }));
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = new this.orderModel({
            items,
            user: dto.user,
            totalPrice,
            location: dto.location,
        });
        const savedOrder = await order.save();
        await this.notifyNearbyErranders(savedOrder);
        return savedOrder;
    }
    async notifyNearbyErranders(order) {
        var _a;
        console.log(order, "order is here ooo");
        if (!order.location || !order.location.coordinates) {
            throw new common_1.BadRequestException("Order location is required.");
        }
        let erranders = await this.userModel.find({
            role: "errander",
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: (_a = order === null || order === void 0 ? void 0 : order.location) === null || _a === void 0 ? void 0 : _a.coordinates,
                    },
                    $maxDistance: 10000,
                },
            },
        });
        console.log(erranders, "available erranders");
        if (erranders.length === 0) {
            erranders = await this.userModel.find({
                role: 'errander',
            });
        }
        const notificationMessage = `A new order has been placed${erranders.length === 0 ? '' : ' nearby'}.`;
        if (erranders.length) {
            for (const errander of erranders) {
                await this.notificationService.sendNotification(errander._id, "New Order Available", notificationMessage, { orderId: order._id, orderDetails: order });
            }
        }
    }
    async acceptOrder(orderId, erranderId) {
        const order = await this.orderModel.findById(orderId);
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        const user = await this.userModel.findById(order.user);
        if (user) {
            await this.notificationService.sendNotification(user._id, "Order Accepted", `Your order has been accepted by an errander.`, { orderId: order._id });
        }
    }
    async getOrders() {
        return this.orderModel.find().populate("items.product").exec();
    }
    async deleteOrder(id) {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order)
            throw new common_1.NotFoundException("Order not found");
        await Promise.all(order.items.map(async (item) => {
            const product = await this.productModel.findById(item.product);
            if (product) {
                product.currentInStock += item.quantity;
                await product.save();
            }
        }));
    }
    async getUserOrders(userId) {
        const objectId = new mongoose_2.Types.ObjectId(userId);
        return this.orderModel.find({ user: objectId }).exec();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], OrderService);
//# sourceMappingURL=order.service.js.map