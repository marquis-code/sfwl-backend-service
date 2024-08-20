import { MessageEvent } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.dto";
import { WalletService } from "../wallet/wallet.service";
import { Order } from "./order.schema";
import { Observable } from 'rxjs';
export declare class OrderController {
    private readonly orderService;
    private readonly walletService;
    constructor(orderService: OrderService, walletService: WalletService);
    getOrders(): Promise<{
        orders: any;
        fromCache: boolean;
    }>;
    createOrder(req: any, createOrderDto: CreateOrderDto): Promise<Order>;
    sendOrderEvents(location: string): Observable<MessageEvent>;
    private createMessageEvent;
    private isErranderWithinRadius;
    private calculateDistance;
    private deg2rad;
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
    getOrdersByVendor(req: any): Promise<Order[]>;
}
