// create a notification dto

export class CreateNotificationDto {
  emisorUser: string;
  receptorUser: string; // FK
  status: boolean;
  action: Enumerator;
  title: string;
  description: string; // TXT
  notificationDate: Date; // TIMESTAMP
}