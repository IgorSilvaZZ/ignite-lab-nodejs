/* eslint-disable prettier/prettier */

import { Notification } from 'src/app/entities/Notification';
import { NotificationRepository } from 'src/app/repositories/NotificationRepository';

export class NotificationsRepositoryInMemory implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
