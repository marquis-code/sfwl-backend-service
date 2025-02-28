import { IsString, IsNumber } from "class-validator";

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  cost: number;
}
