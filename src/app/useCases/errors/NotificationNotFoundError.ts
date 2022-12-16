/* eslint-disable prettier/prettier */

export class NotificationNotFoundError extends Error {
  constructor() {
    super('Notiication not found!');
  }
}
