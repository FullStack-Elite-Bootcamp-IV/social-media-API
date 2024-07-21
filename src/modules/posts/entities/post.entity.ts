import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { LikeEntity } from 'src/modules/likes/entities/like.entity';
import { FavouritesEntity } from 'src/modules/favourites/entities/favourites.entity';
import { CommentsEntity } from 'src/modules/comments/entities/comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  media: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  publicationDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updateDate: Date;

  @Column({ default: 0 })
  likes: number;
  
  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { cascade: true, onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.post, { cascade: true, onDelete: 'CASCADE' })
  likesPost: LikeEntity[];

  @OneToMany(() => FavouritesEntity, favourites => favourites.postId, { cascade: true, onDelete: 'CASCADE' })
  favourites: FavouritesEntity[];

  @OneToMany(() => CommentsEntity, comments => comments.post, { cascade: true, onDelete: 'CASCADE' })
  comments: CommentsEntity[];
}
