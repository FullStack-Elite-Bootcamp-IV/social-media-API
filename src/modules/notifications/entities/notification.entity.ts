import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

// Enum for different types of notification actions
export enum NotificationAction {
  MESSAGES = 'messages',
  LIKES = 'likes',
  COMMENTS = 'comments',
  NEW_FOLLOW_REQUEST = 'new_follow_request',
  FOLLOW_REQUEST_ACCEPTED = 'follow_request_accepted',
}

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'boolean', default: false })
  status: boolean; // Indicates whether the notification has been read or not

  @Column({ type: 'enum', enum: NotificationAction, nullable: false })
  action: NotificationAction; // Type of action that triggered the notification
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string; // Title of the notification
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string; // Detailed description of the notification
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  notificationDate: Date; // Timestamp when the notification was created
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  receptorUser: UserEntity; // User who receives the notification
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  emisorUser: UserEntity; // User who sends the notification
}
