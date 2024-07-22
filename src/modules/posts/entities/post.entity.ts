import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { LikeEntity } from '../../likes/entities/like.entity';
import { FavouritesEntity } from '../../favourites/entities/favourites.entity';
import { CommentsEntity } from '../../comments/entities/comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column({ nullable: true })
  // Title of the post.
  title: string;

  @Column({ type: 'text', nullable: true })
  // Description of the post.
  description: string;

  @Column({ nullable: true })
  // URL of the media associated with the post.
  media: string;

  @Column({ default: false })
  // Indicates whether the post is public.
  isPublic: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  // Date and time when the post was published.
  publicationDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  // Date and time when the post was last updated.
  updateDate: Date;

  @Column({ default: 0 })
  // Number of likes the post has received.
  likes: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  // User who created the post.
  userId: string;

  /* @OneToMany(() => LikeEntity, (like) => like.post)
  // List of likes associated with the post.
  likesPost: LikeEntity[]; */

  @OneToMany(() => FavouritesEntity, (favourites) => favourites.post)
  // List of favorites associated with the post.
  favourites: FavouritesEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.postId)
  // List of comments associated with the post.
  comments: CommentsEntity[];
}
