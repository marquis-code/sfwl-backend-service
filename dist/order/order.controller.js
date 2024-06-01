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
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
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
        console.log(userId, 'user id here');
        return this.orderService.getUserOrders(userId);
    }
    async acceptOrder(orderId, req) {
        const user = req.user;
        await this.orderService.acceptOrder(orderId, user._id);
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
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin),
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
    (0, common_1.Get)('/user-orders'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin, role_enum_1.Role.Vendor),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Post)(':id/accept'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.Admin, role_enum_1.Role.Errander),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "acceptOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)("orders"),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map