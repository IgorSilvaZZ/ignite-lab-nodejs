/* eslint-disable prettier/prettier */

import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { CountRecipientNotificationsUseCase } from './CountRecipientNotificationsUseCase';

describe('Count Notification', () => {
  it('should be able to count a recipient  notifications ', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const countRecipientNotifications = new CountRecipientNotificationsUseCase(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
