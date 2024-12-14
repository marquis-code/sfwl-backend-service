// import { createHash } from "crypto";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { Request } from "express";
// import { sendEmail } from "../utils/sendEmail";
// import { User, UserDocument } from "../user/user.schema";
// // nest.js modules
// import {
//   Injectable,
//   BadRequestException,
//   NotFoundException,
//   ConflictException,
//   InternalServerErrorException,
// } from "@nestjs/common";

// // libraries

// // types

// // DTOs
// import {
//   SignupDto,
//   LoginDto,
//   UpdatePasswordDto,
//   ResetPasswordDto,
// } from "./auth.dto";

// // utils

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private readonly User: Model<UserDocument>
//   ) {}

//   async signup(dto: SignupDto) {
//     let user = await this.User.findOne({
//       email: dto.email,
//     });

//     if (user)
//       throw new ConflictException([
//         "A user already exists with the entered email",
//       ]);

//     user = new this.User(dto);

//     const savedUser = await user.save();

//     await user.save();

//     user.password = undefined;

//     return { user };
//   }

//   async login(dto: LoginDto) {
//     const user = await this.User.findOne({
//       email: dto.email,
//     }).select("+password");

//     if (!user)
//       throw new NotFoundException(["No user exists with the entered email"]);

//     const isMatch = await user.matchPassword(dto.password);

//     if (!isMatch) throw new BadRequestException(["Invalid password"]);

//     user.password = undefined;

//     return { token: user.getSignedJwtToken(), user };
//   }

//   async updatePassword(dto: UpdatePasswordDto, currentUser: UserDocument) {
//     const user = await this.User.findById(currentUser.id).select("+password");

//     const isMatch = await user.matchPassword(dto.password);

//     if (!isMatch) throw new BadRequestException(["Invalid password"]);

//     user.password = dto.newPassword;

//     await user.save();

//     user.password = undefined;

//     return { user };
//   }

//   async forgotPassword(req: Request, email: string) {
//     const user = await this.User.findOne({ email });

//     if (!user)
//       throw new NotFoundException(["No user exists with the entered email"]);

//     const token = user.getResetPasswordToken();

//     await user.save();

//     const resetURL = `${req.protocol}://${req.get(
//       "host"
//     )}/api/v1/auth/reset-password?token=${token}`;

//     const message = `Dear ${user.name}, <br /><br />We have received your request for a password reset. Please use the following link to reset your password: <a href="${resetURL}" target="_blank">${resetURL}</a><br /><br />Please note that this link will expire in 10 minutes for security purposes, so please reset your password as soon as possible. If you do not reset your password within the given time, you will need to request a new password reset link.<br /><br />If you did not request a password reset, please ignore this email.<br /><br />Thank you, <br />MK Store`;

//     try {
//       await sendEmail({
//         subject: "Password reset link - Expires in 10 minutes",
//         to: email,
//         html: message,
//       });
//     } catch (err) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;

//       await user.save();

//       throw new InternalServerErrorException(["Email could not be sent"]);
//     }

//     return { message: "Please check your email" };
//   }

//   async resetPassword(dto: ResetPasswordDto, token: string) {
//     if (!token)
//       throw new BadRequestException([
//         "Invalid password reset token",
//         "Request a new password reset link",
//       ]);

//     const resetPasswordToken = createHash("sha256")
//       .update(token)
//       .digest("base64");

//     const user = await this.User.findOne({ resetPasswordToken }).select(
//       "+resetPasswordExpire"
//     );

//     if (!user)
//       throw new BadRequestException([
//         "Invalid password reset token",
//         "Request a new password reset link",
//       ]);

//     if (Date.now() > user.resetPasswordExpire) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;

//       await user.save();

//       throw new BadRequestException([
//         "Password reset token expired",
//         "Request a new password reset link",
//       ]);
//     }

//     user.password = dto.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     user.password = undefined;

//     return { user };
//   }
// }

import { createHash } from "crypto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Request } from "express";
import { sendEmail } from "../utils/sendEmail";
import { User, UserDocument } from "../user/user.schema";
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  SignupDto,
  LoginDto,
  UpdatePasswordDto,
  ResetPasswordDto,
} from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<UserDocument>
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.User.findOne({ email: dto.email });

    if (existingUser)
      throw new ConflictException("A user already exists with the entered email");

    const user = new this.User(dto);

    await user.save();

    user.password = undefined;

    return { user };
  }

  async login(dto: LoginDto) {
    const user = await this.User.findOne({ email: dto.email }).select("+password");

    if (!user) throw new NotFoundException("No user exists with the entered email");

    const isMatch = await user.matchPassword(dto.password);

    if (!isMatch) throw new BadRequestException("Invalid password");

    user.password = undefined;

    return { token: user.getSignedJwtToken(), user };
  }

  async forgotPassword(req: Request, email: string) {
    const user = await this.User.findOne({ email });

    if (!user)
      throw new NotFoundException("No user exists with the entered email");

    const token = user.getResetPasswordToken();

    await user.save();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password?token=${token}`;

    const message = `Dear ${user.name}, <br /><br />Please use the following link to reset your password: <a href="${resetURL}" target="_blank">${resetURL}</a>.`;

    try {
      await sendEmail({
        subject: "Password Reset",
        to: email,
        html: message,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      throw new InternalServerErrorException("Email could not be sent");
    }

    return { message: "Please check your email" };
  }

  async resetPassword(dto: ResetPasswordDto, token: string) {
    if (!token) throw new BadRequestException("Invalid password reset token");

    const resetPasswordToken = createHash("sha256").update(token).digest("hex");

    const user = await this.User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new BadRequestException("Invalid or expired token");

    user.password = dto.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    user.password = undefined;

    return { user };
  }

  async updatePassword(dto: UpdatePasswordDto, currentUser: UserDocument) {
    const user = await this.User.findById(currentUser._id).select("+password");
  
    if (!user) {
      throw new NotFoundException("User not found");
    }
  
    const isMatch = await user.matchPassword(dto.password);
    if (!isMatch) {
      throw new BadRequestException("Invalid current password");
    }
  
    user.password = dto.newPassword;
    await user.save();
  
    user.password = undefined; // Remove password from the returned object
    return { user };
  }
}
