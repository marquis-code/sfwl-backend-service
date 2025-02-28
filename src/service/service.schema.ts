import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  cost: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
