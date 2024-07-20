import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { FavouritesEntity } from 'src/modules/favourites/entities/favourites.entity';
import { CommentsEntity } from 'src/modules/comments/entities/comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => FavouritesEntity, favourites => favourites.postId, { cascade: true, onDelete: 'CASCADE' })
  favourites: FavouritesEntity[];

  @OneToMany(() => CommentsEntity, comments => comments.post, { cascade: true, onDelete: 'CASCADE' })
  comments: CommentsEntity[];
}
