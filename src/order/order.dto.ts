import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsEnum,
  IsMongoId,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
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
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => OrderItemDto)
  // items: OrderItemDto[];

  @IsNotEmpty()
  @IsMongoId()
  user: string;

  location: {
    type: "Point";
    coordinates: [number, number];
  };

  // @IsNotEmpty()
  // @IsString()
  // erranderId: string;

  @IsOptional()
  @IsMongoId()
  erranderId?: string;

  @IsNotEmpty()
  @IsEnum(["pending", "accepted", "delivered"])
  status: string = "pending";

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}

export class UpdateOrderDto {
  items?: OrderItemDto[];
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}
