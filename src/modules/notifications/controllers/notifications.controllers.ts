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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // Create a new notification
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
  ) {
    // Calls the service to handle the creation of a notification
    return this.notificationsService.createNotification(createNotificationDto);
  }

  // Delete a notification by ID
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
    // Calls the service to handle the deletion of a notification
    return this.notificationsService.deleteNotification(notificationId);
  }

  // Find notifications by user ID
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
    @Param('userId') userId: string,
  ): Promise<void> {
    // Calls the service to get notifications for a specific user
    await this.notificationsService.findNotificationsByUser(userId);
  }
}
