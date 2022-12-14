/* eslint-disable prettier/prettier */

import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { CancelNotificationUseCase } from './CancelNotificationUseCase';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
