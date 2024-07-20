import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('Favourites')
export class FavouritesEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  creationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.id)
  postId: string
}