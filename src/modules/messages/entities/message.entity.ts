import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';// if need more entity you can add here 
import { UserEntity } from '../../users/entities/user.entity';
import { ChatEntity } from '../../chats/entities/chat.entity';

@Entity('messages')
export class MessageEntity {
  
  //Id of the message
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Content of the message
  @Column({ type: 'text'})
  messageContent?: string;
  
  // Optional media URL or identifier associated with the message
  @Column({ type: 'varchar', length: 100, nullable: true })
  media?: string;
  
   // Timestamp when the message was created
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationTime: Date;
  
  // User who sent the message
  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: string;

  // Chat to which the message belongs
  @ManyToOne(() => ChatEntity, chat => chat.chatId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chatId: string;
}

