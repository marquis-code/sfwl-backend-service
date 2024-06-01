import { IsEnum, MaxLength, IsPositive, IsNotEmpty, MinLength, IsNumber  } from "class-validator"
import { Transform } from 'class-transformer';

import { Category } from "./product.schema"

export class ProductDto {
	@IsNotEmpty({ message: "Name should not be empty" })
	@MaxLength(100, {
		message: "Enter a product name not more than 100 characters",
	})
	name: string

	@IsNotEmpty({ message: "Description should not be empty" })
	@MaxLength(2000, {
		message: "Enter a product description not more than 2000 characters",
	})
	description: string

	@IsNumber({}, { message: "Price should be a number" })
	@IsNotEmpty({ message: "Price should not be empty" })
	@Transform(({ value }) => parseFloat(value))
	readonly price: number;

	@IsNumber({}, { message: "Product in stock should be a number" })
	@IsNotEmpty({ message: "Product in stock should not be empty" })
	@Transform(({ value }) => parseInt(value, 10))
	readonly currentInStock: number;

	@IsNotEmpty({ message: "Category should not be empty" })
	@IsEnum(Category, { message: "Enter a valid category" })
	category: string

	cloudinary_id?: string;
	image?: string;
}

export class UpdateProductDto {
	name?: string;
	description?: string;
	price?: number;
	currentInStock?: number;
	category?: string;
	cloudinary_id?: string;
	image?: string;
}