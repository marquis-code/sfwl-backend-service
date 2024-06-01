import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationService], // Export NotificationService to make it available to other modules
})
export class NotificationModule {}
