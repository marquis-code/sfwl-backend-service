import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthTipsService } from './health-tips.service';
import { HealthTipsController } from './health-tips.controller';
import { HealthTip, HealthTipSchema } from './schemas/health-tip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HealthTip.name, schema: HealthTipSchema }]),
  ],
  controllers: [HealthTipsController],
  providers: [HealthTipsService],
})
export class HealthTipsModule {}
