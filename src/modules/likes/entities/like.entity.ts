import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('likes')
export class LikeEntity {
  
  // Unique identifier for the like
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the like.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  // Timestamp when the like was created
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp when the like was created.',
    example: '2024-07-21T15:30:00Z',
  })
  creationDate: Date;

  // User who liked the post
  @ManyToOne(() => UserEntity, (user) => user.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'User who liked the post.',
    example: '987e6543-e21b-32d4-a567-426614174001',
  })
  userId: string;

  // Post that was liked
  @ManyToOne(() => PostEntity, (post) => post.postId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  @ApiProperty({
    description: 'Post that was liked.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  postId: string;
}
