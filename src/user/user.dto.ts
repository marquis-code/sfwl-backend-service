import {
	IsEmail,
	IsMobilePhone,
	IsString,
	MinLength,
	IsOptional,
	IsArray,
	IsMongoId,
	IsEnum
} from "class-validator";
import { SubscriptionPlan } from "../shared/enums";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}



export class CreateUserDto {
	@IsString({
		message: "Enter a name",
	})
	name: string;

	@IsEmail({}, { message: "Enter a valid email" })
	email: string;

	@MinLength(6, { message: "Enter a password at least 6 characters long" })
	password: string;

	@IsMobilePhone(null, {}, { message: "Enter a valid phone number" })
	phone: string;

	@IsOptional()
	@IsArray({ message: "Activities must be an array" })
	@IsMongoId({ each: true, message: "Each activity must be a valid MongoDB ID" })
	activities?: string[]; // Optional array of MongoDB IDs


	// @IsOptional()
	@IsString()
	@IsEnum(SubscriptionPlan, { message: "Subscription plan must be either 'basic' or 'premium'" })
	subscriptionPlan?: SubscriptionPlan;


	@IsOptional()
	@IsString({ message: "Subscription expiry must be a valid string" })
	subscriptionExpiry?: Date; // Change to Date

	@IsOptional()
	@IsEnum(UserRole, { message: "Enter a valid role: admin or user" })
	role?: UserRole;
}

export class UpdateUserDto {
	@IsOptional()
	@IsString({
		message: "Enter a name",
	})
	name?: string;

	@IsOptional()
	@IsEmail({}, { message: "Enter a valid email" })
	email?: string;

	@IsOptional()
	@MinLength(6, { message: "Enter a password at least 6 characters long" })
	password?: string;

	@IsOptional()
	@IsMobilePhone(null, {}, { message: "Enter a valid phone number" })
	phone?: string;

	@IsOptional()
	@IsArray({ message: "Activities must be an array" })
	@IsMongoId({ each: true, message: "Each activity must be a valid MongoDB ID" })
	activities?: string[]; // Optional array of MongoDB IDs

	@IsOptional()
	@IsEnum(SubscriptionPlan, { message: "Subscription plan must be either 'basic' or 'premium'" })
	subscriptionPlan?: SubscriptionPlan;

	@IsOptional()
	@IsString({
		message: "",
	})
	subscriptionExpiry?: string;

	@IsOptional()
	@IsEnum(UserRole, { message: "Enter a valid role: admin or user" })
	role?: UserRole;
}
