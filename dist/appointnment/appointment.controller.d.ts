import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<import("./appointment.schema").Appointment>;
    findAll(): Promise<import("./appointment.schema").Appointment[]>;
    findOne(id: string): Promise<import("./appointment.schema").Appointment>;
    updateStatus(id: string, status: string): Promise<import("./appointment.schema").Appointment>;
    remove(id: string): Promise<void>;
}
