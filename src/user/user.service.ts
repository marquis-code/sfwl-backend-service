// nest.js modules
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

// types
import { Model } from "mongoose";

// schema
import { User, UserDocument } from "./user.schema";

// DTOs
import { CreateUserDto, UpdateUserDto } from "./user.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<UserDocument>
  ) {}

  async getUsers() {
    const users = await this.User.find();

    return { users };
  }

  async createUser(createUserDto: CreateUserDto): Promise<{ user: User }> {
    // Check if a user already exists with the provided email
    let existingUser = await this.User.findOne({ email: createUserDto.email });
  
    if (existingUser) {
      throw new ConflictException(["A user already exists with the entered email"]);
    }
  
    const currentDate = new Date();
  
    // Set subscription expiry to 60 days from now regardless of the subscription plan
    const subscriptionExpiry = new Date(currentDate.setDate(currentDate.getDate() + 60));
  
    const user = new this.User({
      ...createUserDto,
      activities: createUserDto.activities || [], // Default to an empty array if not provided
      subscriptionExpiry, // Set calculated expiry date
    });
  
    const savedUser = await user.save();
  
    if (savedUser) {
      savedUser.password = undefined; // Remove password before returning the user
    }
  
    return { user: savedUser };
  }

  async getUser(id: string) {
    const user = await this.User.findById(id).populate('wallet').exec();;

    if (!user)
      throw new NotFoundException(["No user found with the entered ID"]);

    return { user };
  }

  async updateUser(id: string, dto: UpdateUserDto, currentUser: UserDocument) {
    const user = await this.User.findById(id);

    if (!user)
      throw new NotFoundException(["No user found with the entered ID"]);

    if (currentUser.id !== user.id)
      throw new ForbiddenException([
        "The current user can't access this resource",
      ]);

    user.name = dto.name;
    user.phone = dto.phone;

    await user.save();

    return { user };
  }

  async deleteUser(id: string, currentUser: UserDocument) {
    const user = await this.User.findById(id);

    if (!user)
      throw new NotFoundException(["No user found with the entered ID"]);

    if (currentUser.id !== user.id)
      throw new ForbiddenException([
        "The current user can't access this resource",
      ]);

    await user.deleteOne();

    return {};
  }
}
