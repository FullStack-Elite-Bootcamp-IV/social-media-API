import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { NotificationAction } from '../entities/notification.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  emisorUser: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  receptorUser: string;

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

  @ApiProperty()
  @IsDateString()
  lastLogoutDate: string;
}
