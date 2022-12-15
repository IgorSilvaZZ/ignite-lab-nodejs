/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import { Content } from '../entities/Content';
import { Notification } from '../entities/Notification';
import { NotificationRepository } from '../repositories/NotificationRepository';

interface ISendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ISendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = request;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
