/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { NotificationRepository } from 'src/app/repositories/NotificationRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/PrismaNotificationRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}