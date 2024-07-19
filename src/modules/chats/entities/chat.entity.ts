import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Chats')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text'})
  user1Id: string;

  @Column({ type: 'text'})
  user2Id: string;

  @Column({ type: 'timestamp', nullable: true })
  lastMessage?: Date;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user1Id' })
  user1: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user2Id' })
  user2: UserEntity;
}
