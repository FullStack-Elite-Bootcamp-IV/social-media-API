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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { NotificationEntity } from '../entities/notification.entity';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new notification',
    description: 'Sends a new notification and returns the created notification.',
  })
  @ApiResponse({
    status: 201,
    description: 'Notification sent.',
    type: CreateNotificationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete a notification by ID',
    description: 'Deletes a notification specified by its ID.',
  })
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
  deleteNotification(@Param('id') notificationId: string): Promise<void> {
    return this.notificationsService.deleteNotification(notificationId);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Find notifications by user ID',
    description: 'Retrieves all notifications for a specific user identified by their ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all notifications.',
    type: [CreateNotificationDto],
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
  async findNotificationsByUser(
    @Param('userId') userId: string,
  ): Promise<NotificationEntity[]> {
    return this.notificationsService.findNotificationsByUser(userId);
  }
}
