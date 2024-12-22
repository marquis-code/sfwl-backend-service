import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HealthTip, HealthTipDocument } from './schemas/health-tip.schema';
import { CreateHealthTipDto } from './dtos/create-health-tip.dto';
import { UpdateHealthTipDto } from './dtos/update-health-tip.dto';

@Injectable()
export class HealthTipsService implements OnModuleInit {
  constructor(
    @InjectModel(HealthTip.name)
    private healthTipModel: Model<HealthTipDocument>,
  ) {}

  async create(createHealthTipDto: CreateHealthTipDto): Promise<HealthTip> {
    const healthTip = new this.healthTipModel(createHealthTipDto);
    return healthTip.save();
  }

  async findAll(): Promise<HealthTip[]> {
    return this.healthTipModel.find().exec();
  }

  async findOne(id: string): Promise<HealthTip> {
    const healthTip = await this.healthTipModel.findById(id).exec();
    if (!healthTip) {
      throw new NotFoundException(`Health Tip with ID ${id} not found`);
    }
    return healthTip;
  }

  async update(
    id: string,
    updateHealthTipDto: UpdateHealthTipDto,
  ): Promise<HealthTip> {
    const updatedHealthTip = await this.healthTipModel
      .findByIdAndUpdate(id, updateHealthTipDto, { new: true })
      .exec();
    if (!updatedHealthTip) {
      throw new NotFoundException(`Health Tip with ID ${id} not found`);
    }
    return updatedHealthTip;
  }

  async delete(id: string): Promise<void> {
    const result = await this.healthTipModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Health Tip with ID ${id} not found`);
    }
  }

  async findByDate(date: string): Promise<HealthTip[]> {
    return this.healthTipModel.find({ scheduleDate: date }).exec();
  }

  // Cron job to fetch and process today's health tips
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async processTodayHealthTips() {
    const today = new Date().toISOString().split('T')[0];
    const tips = await this.findByDate(today);

    if (tips.length) {
      console.log(`Today's Health Tips:`, tips);
      // Add custom processing logic here (e.g., sending notifications)
    }
  }

  // Ensure cron jobs are initialized for existing scheduled tips
  async onModuleInit() {
    const allTips = await this.findAll();
    console.log(`Loaded Health Tips for Scheduling:`, allTips);
  }
}
