import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
    UserModule
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
