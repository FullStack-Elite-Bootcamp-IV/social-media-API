import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  //  @Post()
  // createNotification(@Body() createNotificationDto: CreateNotificationDto): Promise<NotificationEntity> {return this.notificationsService.createNotification();}

  // @Delete(':id')
  // deleteNotification(@Param('id') notificationId: string): Promise<void> { ... }

  // @Get('user/:userId')
  // findNotificationsByUser(@Param('userId') userId: string): Promise<NotificationEntity[]> { ... }
}
