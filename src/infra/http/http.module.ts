/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { SendNotificationUseCase } from 'src/app/useCases/SendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}