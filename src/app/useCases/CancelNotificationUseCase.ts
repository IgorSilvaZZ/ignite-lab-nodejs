/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@app/repositories/NotificationRepository';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface ICancelNotification {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notificationId,
  }: ICancelNotification): Promise<CancelNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
