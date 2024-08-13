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
import { ApiProperty } from '@nestjs/swagger';
class OrderItemDto {
  @ApiProperty({
    example: 'Banana bread',
    description: 'The name of a product',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  product: string;


  @ApiProperty({
    example: 40,
    description: 'The quantity available in stock',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;


  @ApiProperty({
    example: '123445643234',
    description: 'The id of the vendor',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  vendorId: string;


  @ApiProperty({
    example: 600,
    description: 'The price of the product',
    required: true,
  })
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
