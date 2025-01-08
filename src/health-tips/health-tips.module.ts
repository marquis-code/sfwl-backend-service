import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthTipsService } from './health-tips.service';
import { HealthTipsController } from './health-tips.controller';
import { HealthTips, HealthTipSchema } from './schemas/health-tips.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HealthTips.name, schema: HealthTipSchema }]),
  ],
  controllers: [HealthTipsController],
  providers: [HealthTipsService],
})
export class HealthTipsModule {}
