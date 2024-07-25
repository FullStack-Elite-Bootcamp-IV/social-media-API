import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Chats')
export class ChatEntity {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the chat.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  chatId: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: "ID of user1 in the chat.",
    example: 'user-1',
    required: true
  })
  user1Id: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: "ID of user2 in the chat.",
    example: 'user-2',
    required: true
  })
  user2Id: string;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'Timestamp of the last message in the chat.',
    example: '2024-07-21T15:30:00Z',
    required: false
  })
  lastMessage?: Date;

  @ManyToOne(() => UserEntity, user => user.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user1Id' })
  @ApiProperty({
    description: 'User object for user1 in the chat.',
    type: () => UserEntity,
    required: true
  })
  user1: UserEntity;

  @ManyToOne(() => UserEntity, user => user.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user2Id' })
  @ApiProperty({
    description: 'User object for user2 in the chat.',
    type: () => UserEntity,
    required: true
  })
  user2: UserEntity;
}
