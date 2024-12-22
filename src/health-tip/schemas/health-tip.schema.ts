import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HealthTipDocument = HealthTip & Document;

@Schema()
export class HealthTip {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  scheduleDate: string; // ISO Date string format (e.g., '2024-12-21')
}

export const HealthTipSchema = SchemaFactory.createForClass(HealthTip);
