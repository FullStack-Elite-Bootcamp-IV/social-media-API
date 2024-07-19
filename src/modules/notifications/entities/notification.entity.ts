// src/modules/notifications/entities/notification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';// if need more entity you can add here
import { UserEntity } from '../../users/entities/user.entity';

@Entity('notifications')
export class NotificationEntity {
    // here define the notification entity
}
