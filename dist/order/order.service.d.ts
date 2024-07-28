/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Order, OrderDocument } from "./order.schema";
import { ProductDocument } from "../product/product.schema";
import { CreateOrderDto } from "./order.dto";
import { NotificationService } from "../notification/notification.service";
import { UserDocument } from "../user/user.schema";
import { OrderGateway } from "../order/order.gateway";
export declare class OrderService {
    private readonly orderModel;
    private readonly productModel;
    private readonly userModel;
    private readonly notificationService;
    private orderGateway;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<ProductDocument>, userModel: Model<UserDocument>, notificationService: NotificationService, orderGateway: OrderGateway);
    createOrder(dto: CreateOrderDto): Promise<Order>;
    notifyNearbyErranders(order: any): Promise<void>;
    acceptOrder(orderId: string, erranderId: string): Promise<void>;
    getOrders(): Promise<Order[]>;
    deleteOrder(id: string): Promise<void>;
    getUserOrders(userId: string): Promise<Order[]>;
    getOrdersByVendor(vendorId: string): Promise<Order[]>;
}
