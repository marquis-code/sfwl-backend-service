import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.dto";
import { WalletService } from "../wallet/wallet.service";
import { Order } from "./order.schema";
export declare class OrderController {
    private readonly orderService;
    private readonly walletService;
    constructor(orderService: OrderService, walletService: WalletService);
    getOrders(): Promise<Order[]>;
    createOrder(req: any, createOrderDto: CreateOrderDto): Promise<Order>;
    deleteOrder(id: string): Promise<void>;
    getUserOrders(req: any): Promise<Order[]>;
    acceptOrder(orderId: string, req: any, erranderId: string): Promise<{
        message: string;
    }>;
    completeOrder(id: string): Promise<{
        message: string;
    }>;
    deliverOrder(id: string): Promise<{
        message: string;
    }>;
    getTransactionsForVendor(vendorId: string): Promise<Order[]>;
    getOrdersForErrander(erranderId: string): Promise<Order[]>;
}
