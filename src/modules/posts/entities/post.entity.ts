// here define the post entity
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('posts')
export class PostEntity {
  // here define the post entity whit the properties based on the data base

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

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;
}
