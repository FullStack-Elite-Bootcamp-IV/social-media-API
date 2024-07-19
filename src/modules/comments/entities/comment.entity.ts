import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { PostEntity } from 'src/modules/posts/entities/post.entity';


@Entity('comments')
export class CommentsEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  userId: string;

  @Column({ type: 'varchar', length: 100 })
  postId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; 

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity[];

  @ManyToOne(() => PostEntity, post => post.id)
  post: PostEntity[];
}