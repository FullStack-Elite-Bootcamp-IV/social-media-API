// create a notification dto

import { IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, IsUUID } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  emisorUser: string; // FK

  @IsNotEmpty()
  @IsString()
  receptorUser: string; // FK
  
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
  description: string; // TXT
  
  @IsNotEmpty()
  @IsDate()
  notificationDate: Date; // TIMESTAMP
}