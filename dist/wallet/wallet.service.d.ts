import { Model, Connection } from 'mongoose';
import { WalletDocument } from './wallet.schema';
import { Order, OrderDocument } from '../order/order.schema';
export declare class WalletService {
    private walletModel;
    private orderModel;
    private readonly connection;
    constructor(walletModel: Model<WalletDocument>, orderModel: Model<OrderDocument>, connection: Connection);
    createWallet(userId: string): Promise<string>;
    creditWallet(userId: string, amount: number): Promise<void>;
    handleOrderCompletion(orderId: string): Promise<void>;
    acceptOrder(orderId: string, erranderId: string): Promise<void>;
    markOrderAsDelivered(orderId: string): Promise<void>;
    getTransactionsForVendor(vendorId: string): Promise<Order[]>;
    getOrdersForErrander(erranderId: string): Promise<Order[]>;
}
