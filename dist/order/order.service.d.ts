import { Model } from "mongoose";
import { Order, OrderDocument } from "./order.schema";
import { ProductDocument } from "../product/product.schema";
import { CreateOrderDto } from "./order.dto";
import { NotificationService } from "../notification/notification.service";
import { UserDocument } from "../user/user.schema";
export declare class OrderService {
    private readonly orderModel;
    private readonly productModel;
    private readonly userModel;
    private readonly notificationService;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<ProductDocument>, userModel: Model<UserDocument>, notificationService: NotificationService);
    createOrder(dto: CreateOrderDto): Promise<Order>;
    notifyNearbyErranders(order: any): Promise<void>;
    acceptOrder(orderId: string, erranderId: string): Promise<void>;
    getOrders(): Promise<Order[]>;
    deleteOrder(id: string): Promise<void>;
    getUserOrders(userId: string): Promise<Order[]>;
}
