import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity'; 

@Entity('comments')
export class commentsEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'varchar'})
  userId: string;

  @Column({ type: 'varchar' })
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