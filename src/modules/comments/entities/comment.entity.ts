import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class CommentsEntity {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the comment.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  id: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Content of the comment.',
    example: 'This is a great post!',
    required: true
  })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Timestamp indicating when the comment was created.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'User who made the comment.',
    type: () => UserEntity,
    required: true
  })
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.postId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  @ApiProperty({
    description: 'Post to which the comment belongs.',
    type: () => PostEntity,
    required: true
  })
  postId: string;
}
