import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Doctor", required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: String, required: true })
  service: string;

  @Prop({ type: Date, required: true })
  appointmentDate: Date;

  @Prop({ type: String, enum: ["pending", "approved", "rejected"], default: "pending" })
  status: string;

  @Prop({ type: String, default: null })
  notes?: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
