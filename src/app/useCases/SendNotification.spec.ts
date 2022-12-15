/* eslint-disable prettier/prettier */

import { NotificationsRepositoryInMemory } from '../../../test/repositories/NotificationsRepositoryInMemory';
import { SendNotificationUseCase } from './SendNotificationUseCase';

describe('Send Notification', () => {
  it('should be able to sen a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      content: 'This is notification',
      category: 'social',
      recipientId: 'exemple-reciepient-ID',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
