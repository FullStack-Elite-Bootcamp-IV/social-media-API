import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum NotificationAction {
  MESSAGES = 'messages',
  LIKES = 'likes',
  COMMENTS = 'comments',
  NEW_FOLLOW_REQUEST = 'new_follow_resquest',
  FOLLOW_REQUEST_ACCEPTED = 'follow_request_acepted',
}

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'enum', enum: NotificationAction, nullable: false })
  action: NotificationAction;
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  notificationDate: Date;
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  receptorUser: UserEntity;
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  emisorUser: UserEntity;
}
