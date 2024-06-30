import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  avatar: string; // Assuming avatar is a string URL
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
