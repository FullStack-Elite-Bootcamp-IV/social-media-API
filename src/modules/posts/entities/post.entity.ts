// here define the post entity
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('posts')
export class PostEntity {
  // here define the post entity whit the properties based on the data base
  /*
    id VARCHAR(100) PRIMARY KEY,
    userId VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    media VARCHAR(100), 
    isPublic BOOLEAN NOT NULL DEFAULT FALSE,
    publicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0,
  */

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
