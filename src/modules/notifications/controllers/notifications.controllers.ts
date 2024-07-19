import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // create a notification
  @Post()
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  //delete a notification by the notification id
  @Delete(':id')
  deleteNotification(@Param('id') notificationId: string): Promise<void> {
    return this.notificationsService.deleteNotification(notificationId);
  }
  // find a notification by the user id
  @Get('user/:userId')
  async findNotificationsByUser(
    @Param('userId') userId: UserEntity,
  ): Promise<void> {
    await this.notificationsService.findNotificationsByUser(userId);
  }
}
