import { Document, Types } from "mongoose";
import { Product } from "../product/product.schema";
export type OrderDocument = Order & Document;
declare class OrderItem {
    product: Product;
    quantity: number;
    vendorId: string;
    price: number;
}
export declare const OrderItemSchema: import("mongoose").Schema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, Document<unknown, any, OrderItem> & OrderItem & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, import("mongoose").FlatRecord<OrderItem>> & import("mongoose").FlatRecord<OrderItem> & {
    _id: Types.ObjectId;
}>;
export declare class Order {
    items: OrderItem[];
    user: Types.ObjectId;
    erranderId: string;
    status: string;
    totalPrice: number;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order> & Order & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
}>;
export {};
