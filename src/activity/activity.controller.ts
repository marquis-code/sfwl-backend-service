import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from "../auth/auth.guard"
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
@UseGuards(AuthGuard) // Ensure only authenticated users can access these routes
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto, @Req() req) {
    try {
      const activity = await this.activityService.create(
        createActivityDto,
        req.user.id, // Logged-in user's ID
      );
      return { success: true, data: activity };
    } catch (error) {
      throw new HttpException(
        'Error creating activity',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Req() req) {
    try {
      const activities = await this.activityService.findAll(req.user.id);
      return { success: true, data: activities };
    } catch (error) {
      throw new HttpException(
        'Error fetching activities',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAllUserActivities(@Query('userId') userId: string, @Req() req) {
    try {
      // Check if userId is provided
      if (!userId) {
        throw new HttpException(
          'User ID is required to fetch activities',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Fetch all activities for the given user
      const activities = await this.activityService.findByUserId(userId);
      return { success: true, data: activities };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching activities',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      const activity = await this.activityService.findOne(id, req.user.id);
      return { success: true, data: activity };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching activity',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Req() req,
  ) {
    try {
      const updatedActivity = await this.activityService.update(
        id,
        updateActivityDto,
        req.user.id,
      );
      return { success: true, data: updatedActivity };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating activity',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    try {
      await this.activityService.delete(id, req.user.id);
      return { success: true, message: 'Activity deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error deleting activity',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
