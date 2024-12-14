// // /* eslint-disable @typescript-eslint/ban-types */
// // import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
// // import { HydratedDocument } from "mongoose"

// // import { sign } from "jsonwebtoken"
// // import { genSalt, hash, compare } from "bcryptjs"
// // import { randomBytes, createHash } from "crypto"
// // import { Types } from "mongoose";

// // export type UserDocument = HydratedDocument<User>

// // @Schema()
// // export class User {
// // 	@Prop({ required: true })
// // 	name: string

// // 	@Prop({ required: true, unique: true })
// // 	email: string

// // 	@Prop({ required: true, minlength: 6, select: false })
// // 	password: string

// // 	@Prop({ required: true })
// // 	phone: string

// // 	@Prop({ default: [] })
// // 	activities: string[]; // IDs of activities
  
// // 	@Prop({ default: 'basic' })
// // 	subscriptionPlan: string;
  
// // 	@Prop({ type: Date, default: null })
// // 	subscriptionExpiry: Date;
// // }

// // export const UserSchema = SchemaFactory.createForClass(User)

// // // Define the virtual field
// // UserSchema.virtual('ownedProducts', {
// // 	ref: 'Product',         // The model to use
// // 	localField: '_id',      // Find users where `localField`
// // 	foreignField: 'createdBy', // is equal to `foreignField`
// //   });

// // UserSchema.index({ location: '2dsphere' });

// // UserSchema.pre("save", async function (next) {
// // 	if (!this.isModified("password")) return next()

// // 	const salt = await genSalt(10)
// // 	this.password = await hash(this.password, salt)
// // })

// // UserSchema.methods.getSignedJwtToken = function () {
// // 	return sign({ id: this.id }, process.env.JWT_SECRET, {
// // 		expiresIn: process.env.JWT_EXPIRE,
// // 	})
// // }

// // UserSchema.methods.matchPassword = async function (enteredPwd: string) {
// // 	return await compare(enteredPwd, this.password)
// // }

// // UserSchema.methods.getResetPasswordToken = function () {
// // 	const token = randomBytes(20).toString("base64url")

// // 	this.resetPasswordToken = createHash("sha256")
// // 		.update(token)
// // 		.digest("base64")

// // 	this.resetPasswordExpire = Date.now() + 10 * 60 * 100

// // 	return token
// // }

// /* eslint-disable @typescript-eslint/ban-types */
// import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
// import { HydratedDocument } from "mongoose";
// import { sign } from "jsonwebtoken";
// import { genSalt, hash, compare } from "bcryptjs";
// import { randomBytes, createHash } from "crypto";

// export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true, minlength: 6, select: false })
//   password: string;

//   @Prop({ required: true })
//   phone: string;

//   @Prop({ default: [] })
//   activities: string[]; // IDs of activities

//   @Prop({ default: 'basic' })
//   subscriptionPlan: string;

//   @Prop({ type: Date, default: null })
//   subscriptionExpiry: Date;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.index({ location: '2dsphere' });

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await genSalt(10);
//   this.password = await hash(this.password, salt);
// });

// UserSchema.methods.getSignedJwtToken = function () {
//   return sign({ id: this.id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// UserSchema.methods.matchPassword = async function (enteredPwd: string) {
//   return await compare(enteredPwd, this.password);
// };

// UserSchema.methods.getResetPasswordToken = function () {
//   const token = randomBytes(20).toString("base64url");

//   this.resetPasswordToken = createHash("sha256")
//     .update(token)
//     .digest("base64");

//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Adjusted for clarity

//   return token;
// };


import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { sign } from "jsonwebtoken";
import { genSalt, hash, compare } from "bcryptjs";
import { randomBytes, createHash } from "crypto";

export type UserDocument = HydratedDocument<User> & {
  matchPassword: (password: string) => Promise<boolean>;
  getSignedJwtToken: () => string;
  getResetPasswordToken: () => string;
};

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6, select: false })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: [] })
  activities: string[]; // IDs of activities

  @Prop({ default: "basic" })
  subscriptionPlan: string;

  @Prop({ type: Date, default: null })
  subscriptionExpiry: Date;

  @Prop()
  resetPasswordToken?: string;

  @Prop({ type: Date })
  resetPasswordExpire?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const token = randomBytes(20).toString("base64url");

  this.resetPasswordToken = createHash("sha256").update(token).digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return token;
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});
