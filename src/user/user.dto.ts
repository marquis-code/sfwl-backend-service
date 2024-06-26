import {
	IsEmail,
	IsEnum,
	IsMobilePhone,
	IsString,
	MinLength,
	IsOptional,
} from "class-validator"

import { Role } from "../role/role.enum"

export class CreateUserDto {
	@IsString({
		message: "Enter a name",
	})
	name: string

	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@MinLength(6, { message: "Enter a password at least 6 characters long" })
	password: string

	@IsMobilePhone(null, {}, { message: "Enter a valid phone number" })
	phone: string

	@IsEnum(Role, { message: "Enter a valid role" })
	role: Role

	@IsOptional()
	@IsString({
		message: "Enter home address",
	})
	homeAddress?: string

	@IsOptional()
	@IsString({
		message: "Enter city of residence",
	})
	cityOfResidence?: string


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
}

export class UpdateUserDto {
	@IsString({
		message: "Enter a name",
	})
	name: string

	@IsMobilePhone(null, {}, { message: "Enter a valid phone number" })
	phone: string

	@IsEnum(Role, { each: true, message: "Enter a valid role" })
	role: Role

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

	@IsOptional()
	@IsString({
		message: "Enter home address",
	})
	homeAddress?: string

	@IsOptional()
	@IsString({
		message: "Enter city of residence",
	})
	cityOfResidence?: string

}
