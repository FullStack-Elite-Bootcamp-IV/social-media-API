// src/modules/notifications/services/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  // Function to create a new notification
  // createNotification(createNotificationDto: CreateNotificationDto): Promise<NotificationEntity> { ... }

  // Function to find all notifications
  // findAllNotifications(): Promise<NotificationEntity[]> { ... }

  // Function to update a notification by ID
  // updateNotification(notificationId: string, updateNotificationDto: CreateNotificationDto): Promise<NotificationEntity> { ... }

  // Function to delete a notification by ID
  // deleteNotification(notificationId: string): Promise<void> { ... }

  // Function to find notifications by user ID
  // findNotificationsByUser(userId: string): Promise<NotificationEntity[]> { ... }
}
