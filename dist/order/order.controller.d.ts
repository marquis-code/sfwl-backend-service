import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(): Promise<import("./order.schema").Order[]>;
    createOrder(req: any, createOrderDto: CreateOrderDto): Promise<import("./order.schema").Order>;
    deleteOrder(id: string): Promise<void>;
    getUserOrders(req: any): Promise<import("./order.schema").Order[]>;
    acceptOrder(orderId: string, req: any): Promise<void>;
}
