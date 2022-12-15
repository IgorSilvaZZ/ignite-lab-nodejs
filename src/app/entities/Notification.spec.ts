/* eslint-disable prettier/prettier */
import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Novo pedido de amizade'),
      category: 'social',
      recipientId: 'exemple-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
