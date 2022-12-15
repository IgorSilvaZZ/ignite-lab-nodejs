/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import { Notification } from '../../../../app/entities/Notification';
import { NotificationRepository } from '../../../../app/repositories/NotificationRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
