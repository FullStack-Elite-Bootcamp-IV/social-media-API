// create a notification dto

import { IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  emisorUser: string;

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