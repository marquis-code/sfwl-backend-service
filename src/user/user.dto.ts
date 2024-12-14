import {
	IsEmail,
	IsMobilePhone,
	IsString,
	MinLength,
	IsOptional,
} from "class-validator"


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


	@IsOptional()
	activities?: []

	@IsOptional()
	@IsString({
		message: "",
	})
	subscriptionPlan?: string

	@IsOptional()
	@IsString({
		message: "",
	})
	subscriptionExpiry?: string
}

export class UpdateUserDto {
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


	@IsOptional()
	activities?: []

	@IsOptional()
	@IsString({
		message: "",
	})
	subscriptionPlan?: string

	@IsOptional()
	@IsString({
		message: "",
	})
	subscriptionExpiry?: string

}
