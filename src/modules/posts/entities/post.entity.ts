import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { LikeEntity } from '../../likes/entities/like.entity';
import { FavouritesEntity } from '../../favourites/entities/favourites.entity';
import { CommentsEntity } from '../../comments/entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty desde NestJS Swagger

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the post.',
    example: 'e3b0c442-98fc-1c14-9c0c-4c3b7c8d67d8',
    required: true
  })
  postId: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Title of the post.',
    example: 'My First Post',
    required: false
  })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Description of the post.',
    example: 'This is my first post on the platform.',
    required: false
  })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'URL of the media associated with the post.',
    example: 'https://example.com/image.jpg',
    required: false
  })
  media: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates whether the post is public.',
    example: false,
    required: true
  })
  isPublic: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date and time when the post was published.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  publicationDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date and time when the post was last updated.',
    example: '2024-07-21T15:30:00Z',
    required: true
  })
  updateDate: Date;

  @Column({ default: 0 })
  @ApiProperty({
    description: 'Number of likes the post has received.',
    example: 10,
    required: false
  })
  likes: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'User who created the post.',
    type: () => UserEntity,
    required: true
  })
  user: UserEntity;

  @Column()
  @ApiProperty({
    description: 'ID of the user who created the post.',
    required: true
  })
  userId: string;

  @OneToMany(() => FavouritesEntity, (favourites) => favourites.post)
  @ApiProperty({
    description: 'List of favourites associated with the post.',
    type: () => FavouritesEntity,
    isArray: true,
    required: false
  })
  favourites: FavouritesEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.postId)
  @ApiProperty({
    description: 'List of comments associated with the post.',
    type: () => CommentsEntity,
    isArray: true,
    required: false
  })
  comments: CommentsEntity[];
}
