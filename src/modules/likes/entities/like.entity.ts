// here define the like entity
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
  
  @Column()
  postId: string;
  
  @Column()
  userId: string;
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  user: UserEntity;
  
  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' })
  post: PostEntity;
}
