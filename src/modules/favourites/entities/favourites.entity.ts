import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('Favourites')
export class FavouritesEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  creationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' })
  postId: string
}