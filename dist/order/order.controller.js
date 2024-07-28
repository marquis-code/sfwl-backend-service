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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const auth_decorator_1 = require("../auth/auth.decorator");
const role_enum_1 = require("../role/role.enum");
const order_dto_1 = require("./order.dto");
const wallet_service_1 = require("../wallet/wallet.service");
let OrderController = class OrderController {
    constructor(orderService, walletService) {
        this.orderService = orderService;
        this.walletService = walletService;
    }
    async getOrders() {
        return this.orderService.getOrders();
    }
    async createOrder(req, createOrderDto) {
        const orderPayload = Object.assign(Object.assign({}, createOrderDto), { user: req.user._id });
        return this.orderService.createOrder(orderPayload);
    }
    async deleteOrder(id) {
        return this.orderService.deleteOrder(id);
    }
    async getUserOrders(req) {
        const userId = req.user._id;
        return this.orderService.getUserOrders(userId);
    }
    async acceptOrder(orderId, req, erranderId) {
        const user = req.user;
        await this.walletService.acceptOrder(orderId, erranderId);
        await this.orderService.acceptOrder(orderId, user._id);
        return { message: 'Order accepted by errander.' };
    }
    async completeOrder(id) {
        await this.walletService.handleOrderCompletion(id);
        return { message: 'Order completed and wallets credited.' };
    }
    async deliverOrder(id) {
        await this.walletService.markOrderAsDelivered(id);
        return { message: 'Order marked as delivered and wallets credited.' };
    }
    async getTransactionsForVendor(vendorId) {
        return this.walletService.getTransactionsForVendor(vendorId);
    }
    async getOrdersForErrander(erranderId) {
        return this.walletService.getOrdersForErrander(erranderId);
    }
    async getOrdersByVendor(req) {
        const vendorId = req.user._id;
        return this.orderService.getOrdersByVendor(vendorId);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin, role_enum_1.Role.Vendor, role_enum_1.Role.Errander, role_enum_1.Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Get)("/user-orders"),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin, role_enum_1.Role.Vendor, role_enum_1.Role.User, role_enum_1.Role.Errander),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Post)(":id/accept"),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin, role_enum_1.Role.Errander),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)('erranderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "acceptOrder", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "completeOrder", null);
__decorate([
    (0, common_1.Patch)(':id/deliver'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deliverOrder", null);
__decorate([
    (0, common_1.Get)('vendor/:vendorId/transactions'),
    __param(0, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getTransactionsForVendor", null);
__decorate([
    (0, common_1.Get)('errander/:erranderId/orders'),
    __param(0, (0, common_1.Param)('erranderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersForErrander", null);
__decorate([
    (0, common_1.Get)('vendor'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin, role_enum_1.Role.Vendor),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersByVendor", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)("orders"),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        wallet_service_1.WalletService])
], OrderController);
//# sourceMappingURL=order.controller.js.map