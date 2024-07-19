import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('Favourites')
export class FavouritesEntity {

  @Column({ type: 'timestamp'})
  creationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.id)
  postId: PostEntity
}