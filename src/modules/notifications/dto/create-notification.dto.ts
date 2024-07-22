import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsDateString, IsUUID, IsOptional } from 'class-validator';
import { NotificationAction } from '../entities/notification.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  
  @ApiProperty({
    description: 'UUID of the user sending the notification.',
    example: 'e8c9f6c6-4a43-4e7b-8c79-0e70b1d473f0',
  })
  @IsNotEmpty()
  @IsString()
  emisorUser: string;

  @ApiProperty({
    description: 'UUID of the user receiving the notification.',
    example: '1d80c5d4-5cf5-4b0e-9b9b-7b2b4a9c3f20',
  })
  @IsNotEmpty()
  @IsString()
  receptorUser: string;

  @ApiProperty({
    description: 'Status of the notification (e.g., read/unread).',
    example: true,
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'Action related to the notification (e.g., LIKE, COMMENT).',
    enum: NotificationAction,
    example: NotificationAction.LIKES,
  })
  @IsNotEmpty()
  @IsEnum(NotificationAction)
  action: NotificationAction;

  @ApiProperty({
    description: 'Title of the notification.',
    example: 'New Comment on Your Post',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the notification.',
    example: 'Your friend commented on your post.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Date when the user last logged out.',
    example: '2024-07-20T18:30:00Z',
  })
  @IsDateString()
  @IsOptional()
  lastLogoutDate: string;
}
