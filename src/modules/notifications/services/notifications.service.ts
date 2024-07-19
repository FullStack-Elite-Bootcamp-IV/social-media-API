// src/modules/notifications/services/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';


@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>
  ) {}

  // Function to create a new notification
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<NotificationEntity> {
    const notification = this.notificationRepository.create(createNotificationDto);
    await this.notificationRepository.save(notification);
    return notification;
   }

  // Function to delete a notification by ID
  async deleteNotification(notificationId: string): Promise<void> { await this.notificationRepository.delete(notificationId) }

  // Function to find notifications by user ID
  async findNotificationsByUser(userId: UserEntity): Promise<void> { await this.notificationRepository.findOneByOrFail(userId) }
}
