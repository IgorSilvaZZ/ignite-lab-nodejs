/* eslint-disable prettier/prettier */
import { Content } from './Content';

describe('Notification Content', () => {
  it('should be able to create a notificatiopn content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notificatiopn content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('should not be able to create a notification content with more tha 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
