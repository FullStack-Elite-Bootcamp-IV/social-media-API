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
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  // Function to create a new notification
  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    const { emisorUser, receptorUser, status, action, title, description } =
      createNotificationDto;
    try {
      if (!emisorUser || !receptorUser) {
        throw new Error('Emisor or receptor user invalid');
      }
      const notification = this.notificationRepository.create({
        emisorUser,
        receptorUser,
        status,
        action,
        title,
        description,
      });
      await this.notificationRepository.save(notification);
      return notification;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to delete a notification by ID
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      if (!notificationId) {
        throw new Error('Notification inexistent');
      }
      await this.notificationRepository.delete(notificationId);
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to find notifications by user ID
  async findNotificationsByUser(userId: UserEntity): Promise<void> {
    try {
      if (!userId) {
        throw new Error('User not found');
      }
      await this.notificationRepository.findOneByOrFail(userId);
    } catch (err) {
      throw new Error(err);
    }
  }
}
