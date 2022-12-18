import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { SendNotificationUseCase } from '@app/useCases/SendNotificationUseCase';
import { CreateNotificationDTO } from '../dtos/CreateNotificationDTO';
import { NotificationViewModel } from '../view-models/NotificationViewModel';
import { CancelNotificationUseCase } from '@app/useCases/CancelNotificationUseCase';
import { ReadNotificationUseCase } from '@app/useCases/ReadNotificationUseCase';
import { UnReadNotificationUseCase } from '@app/useCases/UnReadNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@app/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@app/useCases/GetRecipientNotificationsUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unReadNotification: UnReadNotificationUseCase,
    private countRecipientNotification: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unRead(@Param('id') id: string) {
    await this.unReadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
