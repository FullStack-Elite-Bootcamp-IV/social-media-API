// create a notification dto

import { IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { NotificationAction } from '../entities/notification.entity';
export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  emisorUser: UserEntity['id']; // FK

  @IsNotEmpty()
  @IsString()
  receptorUser: UserEntity['id']; // FK

  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsEnum(NotificationAction)
  action: NotificationAction;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
