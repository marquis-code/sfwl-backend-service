// import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
// import { Types } from "mongoose";
// import { HydratedDocument } from "mongoose";
// import { sign } from "jsonwebtoken";
// import { genSalt, hash, compare } from "bcryptjs";
// import { randomBytes, createHash } from "crypto";
// import { SubscriptionPlan } from "../shared/enums";

// export type UserDocument = HydratedDocument<User> & {
//   matchPassword: (password: string) => Promise<boolean>;
//   getSignedJwtToken: () => string;
//   getResetPasswordToken: () => string;
// };

// export enum UserRole {
//   ADMIN = "admin",
//   USER = "user",
// }


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

//   @Prop([{ type: Types.ObjectId, ref: 'Activity' }]) // Activities reference
//   activities?: Types.ObjectId[];

//   @Prop({
//     type: String,
//     enum: SubscriptionPlan,
//     default: SubscriptionPlan.BASIC,
//   })
//   subscriptionPlan: SubscriptionPlan;

//   @Prop({ type: Date, default: null })
//   subscriptionExpiry?: Date;

//   @Prop()
//   resetPasswordToken?: string;

//   @Prop({ type: Date })
//   resetPasswordExpire?: Date;

//   @Prop({
//     type: String,
//     enum: UserRole,
//     default: UserRole.USER,
//   })
//   role: UserRole;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

// // Rename the virtual field to avoid conflict
// UserSchema.virtual('activityDetails', {
//   ref: 'Activity',
//   localField: '_id',
//   foreignField: 'user',
// });

// UserSchema.methods.matchPassword = async function (enteredPassword: string) {
//   return await compare(enteredPassword, this.password);
// };

// UserSchema.methods.getSignedJwtToken = function () {
//   return sign({ id: this.id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// UserSchema.methods.getResetPasswordToken = function () {
//   const token = randomBytes(20).toString("base64url");

//   this.resetPasswordToken = createHash("sha256").update(token).digest("hex");

//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

//   return token;
// };

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await genSalt(10);
//   this.password = await hash(this.password, salt);

//   next();
// });

import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { HydratedDocument } from "mongoose";
import { sign } from "jsonwebtoken";
import { genSalt, hash, compare } from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import { SubscriptionPlan } from "../shared/enums";

export type UserDocument = HydratedDocument<User> & {
  matchPassword: (password: string) => Promise<boolean>;
  getSignedJwtToken: () => string;
  getResetPasswordToken: () => string;
};

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Schema({ timestamps: true }) // Enable timestamps
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6, select: false })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop([{ type: Types.ObjectId, ref: "Activity" }]) // Activities reference
  activities?: Types.ObjectId[];

  @Prop({
    type: String,
    enum: SubscriptionPlan,
    default: SubscriptionPlan.BASIC,
  })
  subscriptionPlan: SubscriptionPlan;

  @Prop({ type: Date, default: null })
  subscriptionExpiry?: Date;

  @Prop()
  resetPasswordToken?: string;

  @Prop({ type: Date })
  resetPasswordExpire?: Date;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  // Automatically added by `timestamps`
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Rename the virtual field to avoid conflict
UserSchema.virtual("activityDetails", {
  ref: "Activity",
  localField: "_id",
  foreignField: "user",
});

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
