import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // @Post()
  // createNotification(@Body() createNotificationDto: CreateNotificationDto): Promise<NotificationEntity> { ... }

  // @Get()
  // findAllNotifications(): Promise<NotificationEntity[]> { ... }

  // @Put(':id')
  // updateNotification(@Param('id') notificationId: string, @Body() updateNotificationDto: CreateNotificationDto): Promise<NotificationEntity> { ... }

  // @Delete(':id')
  // deleteNotification(@Param('id') notificationId: string): Promise<void> { ... }

  // @Get('user/:userId')
  // findNotificationsByUser(@Param('userId') userId: string): Promise<NotificationEntity[]> { ... }
}
