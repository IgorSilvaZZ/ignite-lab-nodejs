import { Body, Controller, Post } from '@nestjs/common';

import { SendNotificationUseCase } from '@app/useCases/SendNotificationUseCase';
import { CreateNotificationDTO } from '../dtos/CreateNotificationDTO';
import { NotificationViewModel } from '../view-models/NotificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

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
