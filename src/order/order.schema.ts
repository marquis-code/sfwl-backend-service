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

  @Prop({ required: false })
  address: number;

  @Prop({ required: false })
  phone: number;

  @Prop({ required: false })
  orderNotes: number;

  @Prop({ required: false })
  paymentType: number;

  @Prop({ required: false, default: false})
  isNewUser: boolean;

  @Prop({ required: false, default: false})
  isSubscription: boolean;

  @Prop({ required: false })
  startDate: Date

  @Prop({ required: false })
  endDate: Date
  
  @Prop({ type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ location: '2dsphere' });
