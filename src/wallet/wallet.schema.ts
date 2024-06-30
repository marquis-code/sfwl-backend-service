import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema'
import { Types, Document } from "mongoose";

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: User;

  @Prop({ required: true, default: 0 })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
