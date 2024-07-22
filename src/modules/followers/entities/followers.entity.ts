import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger'; // Importing ApiProperty

@Entity('Followers')
export class FollowersEntity {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the follower relationship.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date and time when the follow relationship was created.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  followDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followerId' })
  @ApiProperty({
    description: 'User who is following.',
    type: () => UserEntity,
    required: true
  })
  follower: UserEntity;

  @Column()
  @ApiProperty({
    description: 'ID of the user who is following.',
    example: 'user-123',
    required: true
  })
  followerId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingId' })
  @ApiProperty({
    description: 'User who is being followed.',
    type: () => UserEntity,
    required: true
  })
  following: UserEntity;

  @Column()
  @ApiProperty({
    description: 'ID of the user who is being followed.',
    example: 'user-456',
    required: true
  })
  followingId: string;
}
