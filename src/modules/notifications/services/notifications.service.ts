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
    const {emisorUser, receptorUser, title, description, action, status, notificationDate} = createNotificationDto
    const notification = this.notificationRepository.create();
    
   }

  // Function to delete a notification by ID
  // deleteNotification(notificationId: string): Promise<void> { ... }

  // Function to find notifications by user ID
  // findNotificationsByUser(userId: string): Promise<NotificationEntity[]> { ... }
}
