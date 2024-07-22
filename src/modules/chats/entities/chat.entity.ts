import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Chats') // Define the entity for the 'Chats' table
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid') // Automatically generate a unique identifier for each chat
  chatId: string;

  @Column({ type: 'text' }) // Define a column for user1's ID
  user1Id: string;

  @Column({ type: 'text' }) // Define a column for user2's ID
  user2Id: string;

  @Column({ type: 'timestamp', nullable: true }) // Define a column for the last message timestamp
  lastMessage?: Date;

  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Define a many-to-one relationship with UserEntity for user1
  @JoinColumn({ name: 'user1Id' }) // Specify the column in the 'Chats' table that maps to UserEntity
  user1: UserEntity;

  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Define a many-to-one relationship with UserEntity for user2
  @JoinColumn({ name: 'user2Id' }) // Specify the column in the 'Chats' table that maps to UserEntity
  user2: UserEntity;
}
