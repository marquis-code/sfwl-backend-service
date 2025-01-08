import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';

export class CreateHealthTipDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsISO8601()
  scheduleDate: string; // Validates ISO date format
}
