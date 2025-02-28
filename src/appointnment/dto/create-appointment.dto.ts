import { IsDateString, IsMongoId, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  doctorId: string;

  @IsString()
  service: string;

  @IsDateString()
  appointmentDate: string;
}
