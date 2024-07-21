import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('Favourites') // Specifies the name of the table in the database
export class FavouritesEntity {

  @PrimaryGeneratedColumn("uuid") // Creates a primary key column with UUIDs
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) // Automatically sets the creation date to the current timestamp
  creationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Defines a many-to-one relationship with UserEntity
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' }) // Defines a many-to-one relationship with PostEntity
  postId: string;
}
