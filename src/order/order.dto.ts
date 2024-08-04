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

  // @IsNotEmpty()
  @IsOptional()
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

  @IsOptional()
  address: number;

   @IsOptional()
  phone: number;

  @IsOptional()
  orderNotes: number;

  @IsOptional()
  paymentType: number;

  @IsOptional()
  isNewUser: boolean;

  @IsOptional()
  isSubscription: boolean;

  @IsOptional()
  startDate: Date

   @IsOptional()
  endDate: Date

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
