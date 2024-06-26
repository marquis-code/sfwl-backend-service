import { IsString, IsNotEmpty, IsEmail,	IsOptional, IsMobilePhone, MinLength, IsEnum, IsArray, ArrayMinSize, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for the coordinates array
class LocationCoordinatesDto {
	@IsArray()
	@ArrayMinSize(2, { message: 'Coordinates must have at least 2 numbers' })
	@IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
	coordinates: number[];
  }
  
  // DTO for the location object
  class LocationDto {
	@IsString()
	@IsEnum(['Point'], { message: 'Type must be "Point"' })
	type: string;
  
	@IsArray()
	@ArrayMinSize(2, { message: 'Coordinates must have at least 2 numbers' })
	@IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
	coordinates: number[];
  }

export class SignupDto {
	@IsString({
		message: "Enter your full name",
	})
	name: string

	@IsEmail({}, { message: "Enter a valid email address" })
	email: string

	@IsMobilePhone(null, {}, { message: "Enter a valid phone number" })
	phone: string

	@MinLength(6, { message: "Enter a password at least 6 characters long" })
	password: string

	@IsOptional()
	@IsString({
		message: "Enter a business name",
	})
	businessName?: string

	@IsOptional()
	@IsString({
		message: "Enter a business email",
	})
	businessEmail?: string

	@IsOptional()
	@IsString({
		message: "Enter a business phone",
	})
	businessPhone?: string

	@IsOptional()
	@IsString({
		message: "Enter a CAC registration",
	})
	cacRegistration?: string

	@IsOptional()
	@IsString({
		message: "Enter a business location",
	})
	businessLocation?: string

	@ValidateNested()
	@Type(() => LocationDto)
	location: LocationDto;
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
