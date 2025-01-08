import {
	IsString,
	IsNotEmpty,
	IsEmail,
	IsMobilePhone,
	MinLength,
	IsEnum,
	IsArray,
	ArrayMinSize,
	IsDate,
	IsOptional
  } from 'class-validator';

  import { SubscriptionPlan } from "../shared/enums";
  
  
  export class SignupDto {
	@IsString({ message: 'Enter your full name' })
	name: string;
  
	@IsEmail({}, { message: 'Enter a valid email address' })
	email: string;
  
	@IsMobilePhone(null, {}, { message: 'Enter a valid phone number' })
	phone: string;
  
	@IsString()
	@MinLength(6, { message: 'Enter a password at least 6 characters long' })
	password: string;
  
	@IsOptional()
	@IsArray({ message: 'Activities must be an array' })
	@ArrayMinSize(1, { message: 'Activities must have at least one item' })
	@IsString({ each: true, message: 'Each activity must be a string' })
	activities: string[];

	@IsString()
	@IsNotEmpty({ message: 'Subscription plan is required' })
	@IsEnum(SubscriptionPlan, { message: "Subscription plan must be either 'basic' or 'premium'" })
	subscriptionPlan: SubscriptionPlan;
  
	@IsOptional()
	@IsDate({ message: 'Subscription expiry must be a valid date' })
	subscriptionExpiry: Date;
  }
  

export class LoginDto {
	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@IsNotEmpty({ message: "Enter a password" })
	password: string
}

export class UpdatePasswordDto {
	@IsNotEmpty({ message: "Enter current password" })
	password: string

	@MinLength(6, { message: "Enter new password atleast 6 characters long" })
	newPassword: string
}

export class ResetPasswordDto {
	@MinLength(6, { message: "Enter a password atleast 6 characters long" })
	password: string
}
