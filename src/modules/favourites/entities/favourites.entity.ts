import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Favourites')
export class FavouritesEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the favourite entry.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  @ApiProperty({
    description: 'Date and time when the favourite entry was created.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  creationDate: Date;

  @Column()
  @ApiProperty({
    description: 'ID of the user who favourited the post.',
    example: 'user-1',
    required: true
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'User who favourited the post.',
    type: () => UserEntity,
    required: true
  })
  user: UserEntity;

  @Column()
  @ApiProperty({
    description: 'ID of the post that was favourited.',
    example: 'post-1',
    required: true
  })
  postId: string;

  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  @ApiProperty({
    description: 'Post that was favourited.',
    type: () => PostEntity,
    required: true
  })
  post: PostEntity;
}
