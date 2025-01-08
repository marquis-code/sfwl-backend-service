import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
    userId: string,
  ): Promise<Activity> {
    const createdActivity = new this.activityModel({
      ...createActivityDto,
      user: userId, // Associate the activity with the logged-in user
    });
 
    const savedActivity = await createdActivity.save();

    // Populate the user's activities array
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { activities: savedActivity._id },
    });

    return savedActivity;
  }

  async findAll(userId: string): Promise<Activity[]> {
    return this.activityModel.find({ user: userId }).exec(); // Filter activities by user
  }

  async findOne(id: string, userId: string): Promise<Activity> {
    const activity = await this.activityModel
      .findOne({ _id: id, user: userId }) // Ensure the activity belongs to the user
      .exec();
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
    userId: string,
  ): Promise<Activity> {
    const updatedActivity = await this.activityModel
      .findOneAndUpdate({ _id: id, user: userId }, updateActivityDto, {
        new: true,
      })
      .exec();
    if (!updatedActivity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return updatedActivity;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.activityModel
      .findOneAndDelete({ _id: id, user: userId })
      .exec();
    if (!result) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
  }

  async findByUserId(userId: string): Promise<Activity[]> {
    return this.activityModel.find({ user: userId }).exec(); // Filter activities by user ID
  }
}
