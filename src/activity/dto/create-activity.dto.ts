import { IsNotEmpty, IsString, IsArray } from 'class-validator';

class ActivityItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  activity: ActivityItemDto[];

  @IsArray()
  meals: ActivityItemDto[];
}
