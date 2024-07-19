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
    private notificationRepository: Repository<NotificationEntity>
  ) {}

  // Function to create a new notification
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<NotificationEntity> {
    createNotificationDto;
    const notification = this.notificationRepository.create();
    await this.notificationRepository.save(notification);
    return notification;
    
   }

  // Function to delete a notification by ID
  async deleteNotification(notificationId: string): Promise<void> { await this.notificationRepository.delete(notificationId) }

  // Function to find notifications by user ID
  // findNotificationsByUser(userId: string): Promise<NotificationEntity[]> { ... }
}
