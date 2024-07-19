// create a notification dto

import { IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, IsUUID } from "class-validator";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { NotificationEntity } from "../entities/notification.entity";

export class CreateNotificationDto {

  @IsNotEmpty()
  @IsString()
  emisorUser: UserEntity; // FK

  @IsNotEmpty()
  @IsString()
  receptorUser: UserEntity; // FK
  
  @IsBoolean()
  status: boolean;
  
  @IsNotEmpty()
  @IsNumber()
  action: Enumerator;
  
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  description: string;
}