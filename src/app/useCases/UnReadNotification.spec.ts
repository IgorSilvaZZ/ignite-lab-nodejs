/* eslint-disable prettier/prettier */

import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';
import { UnReadNotificationUseCase } from './UnReadNotificationUseCase';

describe('UnRead Notification', () => {
  it('should be able to unRead a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const unReadNotification = new UnReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unReadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unRead a non existing notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const unReadNotification = new UnReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unReadNotification.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
