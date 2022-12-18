/* eslint-disable prettier/prettier */

import { CancelNotificationUseCase } from '@app/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@app/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@app/useCases/GetRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@app/useCases/ReadNotificationUseCase';
import { UnReadNotificationUseCase } from '@app/useCases/UnReadNotificationUseCase';
import { Module } from '@nestjs/common';

import { SendNotificationUseCase } from 'src/app/useCases/SendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnReadNotificationUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
