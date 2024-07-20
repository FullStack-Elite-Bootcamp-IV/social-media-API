// create a notification dto

import { IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { NotificationAction } from '../entities/notification.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNotificationDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emisorUser: UserEntity['id']; // FK

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  receptorUser: UserEntity['id']; // FK

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(NotificationAction)
  action: NotificationAction;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
