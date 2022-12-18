/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@app/repositories/NotificationRepository';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface IUnReadNotification {
  notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notificationId,
  }: IUnReadNotification): Promise<UnReadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unRead();

    await this.notificationRepository.save(notification);
  }
}
