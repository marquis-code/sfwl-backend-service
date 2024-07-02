import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "../product/product.schema";

export type OrderDocument = Order & Document;

@Schema()
class OrderItem {
  @Prop({ type: Types.ObjectId, ref: "Product" })
  product: Product;

  @Prop({ required: true })
  quantity: number
  
  @Prop({ required: true })
  vendorId: string;

  @Prop({ required: true })
  price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class Order {
  @Prop([{ type: OrderItemSchema }])
  items: OrderItem[];

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user: Types.ObjectId;

  // @Prop({ required: true })
  // erranderId: string;
  @Prop({ type: Types.ObjectId, ref: 'Errander', required: false })
  erranderId?: Types.ObjectId;

  @Prop({ required: true, enum: ['pending', 'accepted', 'delivered'], default: 'pending' })
  status: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ location: '2dsphere' });
