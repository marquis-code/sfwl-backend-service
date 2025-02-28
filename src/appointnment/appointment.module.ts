import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "./appointment.schema";
import { Service, ServiceSchema } from "../service/service.schema";
import { AppointmentService } from "./appointment.service";
import { ServiceService } from "../service/service.service";
import { AppointmentController } from "./appointment.controller";
import { ServiceController } from "../service/service.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [AppointmentController, ServiceController],
  providers: [AppointmentService, ServiceService],
})
export class AppModule {}
