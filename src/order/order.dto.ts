import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
class OrderItemDto {
  product: string;
  quantity: number;
}


class LocationDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  coordinates: number[];
}


export class CreateOrderDto {
  items: OrderItemDto[];
  user: string;
  location: {
      type: 'Point';
      coordinates: [number, number];
    };
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => OrderItemDto)
  // items: OrderItemDto[];

  // @ValidateNested()
  // @Type(() => LocationDto)
  // location: LocationDto;

  // @IsString()
  // @IsNotEmpty()
  // user: string;
}

export class UpdateOrderDto {
  items?: OrderItemDto[];
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}
