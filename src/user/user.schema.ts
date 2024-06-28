/* eslint-disable @typescript-eslint/ban-types */
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

import { sign } from "jsonwebtoken"
import { genSalt, hash, compare } from "bcryptjs"
import { randomBytes, createHash } from "crypto"
import { Types } from "mongoose";
import { Wallet } from '../wallet/wallet.schema'

import { Role } from "../role/role.enum"

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({ required: true })
	name: string

	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: true, minlength: 6, select: false })
	password: string

	@Prop({ required: true })
	phone: string

	@Prop({ enum: [Role.Admin, Role.User, Role.Errander, Role.Vendor], default: Role.User })
	role: Role

	@Prop({ select: false })
	resetPasswordToken: string

	@Prop({ required: false })
	walletId: string;
	// @Prop({ type: Types.ObjectId, ref: "Wallet" })
	// walletId: Wallet;

	@Prop()
	homeAddress?: string;

	@Prop()
	cityOfResidence?: string;
	  	
	@Prop()
	businessName?: string;
	
	@Prop()
	businessEmail?: string;
	
	@Prop()
	businessPhone?: string;

	@Prop()
	cacRegistration?: string;
	
	@Prop()
	businessLocation?: string;

	@Prop({ select: false })
	resetPasswordExpire: number

	@Prop({ default: Date.now })
	createdAt: Date

	getSignedJwtToken: Function
	matchPassword: Function
	getResetPasswordToken: Function


	@Prop({
		type: {
		  type: String,
		  enum: ['Point'],
		  required: true,
		},
		coordinates: {
		  type: [Number],
		  required: true,
		},
	  })
	  location: {
		type: string;
        coordinates: number[];
	  };
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({ location: '2dsphere' });

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()

	const salt = await genSalt(10)
	this.password = await hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
	return sign({ id: this.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

UserSchema.methods.matchPassword = async function (enteredPwd: string) {
	return await compare(enteredPwd, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
	const token = randomBytes(20).toString("base64url")

	this.resetPasswordToken = createHash("sha256")
		.update(token)
		.digest("base64")

	this.resetPasswordExpire = Date.now() + 10 * 60 * 100

	return token
}
