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
import { Model, Connection, Types } from 'mongoose';
import { WalletDocument } from './wallet.schema';
import { Order, OrderDocument } from '../order/order.schema';
export declare class WalletService {
    private walletModel;
    private orderModel;
    private readonly connection;
    constructor(walletModel: Model<WalletDocument>, orderModel: Model<OrderDocument>, connection: Connection);
    createWallet(userId: string): Promise<Types.ObjectId>;
    creditWallet(userId: string, amount: number): Promise<void>;
    handleOrderCompletion(orderId: string): Promise<void>;
    acceptOrder(orderId: string, erranderId: string): Promise<void>;
    markOrderAsDelivered(orderId: string): Promise<void>;
    getTransactionsForVendor(vendorId: string): Promise<Order[]>;
    getOrdersForErrander(erranderId: string): Promise<Order[]>;
}
