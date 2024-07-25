import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ChatEntity } from '../../chats/entities/chat.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('messages')
export class MessageEntity {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the message.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  id: string;

  @Column({ type: 'text'})
  @ApiProperty({
    description: 'Content of the message.',
    example: 'Hello! How are you?',
    required: true
  })
  messageContent?: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Optional media URL or identifier associated with the message.',
    example: 'https://example.com/image.jpg',
    required: false
  })
  media?: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the message was created.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  creationTime: Date;
  
  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  @ApiProperty({
    description: 'User who sent the message.',
    type: () => UserEntity,
    required: true
  })
  user: string;

  @ManyToOne(() => ChatEntity, chat => chat.chatId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  @ApiProperty({
    description: 'Chat to which the message belongs.',
    type: () => ChatEntity,
    required: true
  })
  chatId: string;
}
