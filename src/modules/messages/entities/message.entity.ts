import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';// if need more entity you can add here 
import { UserEntity } from '../../users/entities/user.entity';
import { ChatEntity } from 'src/modules/chats/entities/chat.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'text'})
  messageContent: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  media: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationTime: Date;
  
  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
  
  @ManyToOne(() => ChatEntity, chat => chat.id)  
  @JoinColumn({ name: 'chatId' })
  chatId: ChatEntity;
}
