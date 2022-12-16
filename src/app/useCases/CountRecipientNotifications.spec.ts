/* eslint-disable prettier/prettier */

import { Content } from '@app/entities/Content';
import { Notification } from '@app/entities/Notification';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { CountRecipientNotificationsUseCase } from './CountRecipientNotificationsUseCase';

describe('Count Notification', () => {
  it('should be able to count a recipient  notifications ', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();

    const countRecipientNotifications = new CountRecipientNotificationsUseCase(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova Solicitação de amizade!'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova Solicitação de amizade!'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova Solicitação de amizade!'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
