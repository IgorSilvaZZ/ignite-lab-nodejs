/* eslint-disable prettier/prettier */

import { Content } from '@app/entities/Content';
import { INotificationProps, Notification } from '@app/entities/Notification';

type Override = Partial<INotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova Solicitação de amizade!'),
    recipientId: 'recipient-1',
    ...override,
  });
}
