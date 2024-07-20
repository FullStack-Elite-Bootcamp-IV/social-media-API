import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // create a notification
  @ApiResponse({
    status: 201,
    description: 'Notification sent.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  //delete a notification by the notification id
  @ApiResponse({
    status: 200,
    description: 'Notification deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found.',
  })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteNotification(@Param('id') notificationId: string): Promise<void> {
    return this.notificationsService.deleteNotification(notificationId);
  }
  // find a notification by the user id
  @ApiResponse({
    status: 200,
    description: 'Get all notifications.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Notifications not found.',
  })
  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  async findNotificationsByUser(
    @Param('userId') userId: UserEntity,
  ): Promise<void> {
    await this.notificationsService.findNotificationsByUser(userId);
  }
}
