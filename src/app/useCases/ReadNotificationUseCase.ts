/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@app/repositories/NotificationRepository';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface IReadNotification {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notificationId,
  }: IReadNotification): Promise<ReadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
