import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

// Entity representing a comment in the database
@Entity('comments')
export class CommentsEntity {
  // Unique identifier for the comment, generated as a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Content of the comment
  @Column({ type: 'text' })
  content: string;

  // Timestamp indicating when the comment was created, defaults to the current timestamp
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Many-to-One relationship with the User entity (the user who made the comment)
  @ManyToOne(() => UserEntity, (user) => user.userId, {
    cascade: true, // Allows cascading operations like save or remove
    onDelete: 'CASCADE', // Deletes comments if the associated user is deleted
  })
  @JoinColumn({ name: 'userId' })
  userId: string; // User ID of the user who made the comment

  // Many-to-One relationship with the Post entity (the post the comment is associated with)
  @ManyToOne(() => PostEntity, (post) => post.postId, {
    cascade: true, // Allows cascading operations like save or remove
    onDelete: 'CASCADE', // Deletes comments if the associated post is deleted
  })
  @JoinColumn({ name: 'postId' })
  postId: string; // Post ID of the post where the comment is made
}
