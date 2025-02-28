import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Appointment, AppointmentDocument } from "./appointment.schema";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = new this.appointmentModel(createAppointmentDto);
    return appointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().populate("userId doctorId").exec();
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id).populate("userId doctorId");
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }
    return appointment;
  }

  async updateStatus(id: string, status: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }
    return appointment;
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException("Appointment not found");
    }
  }
}
