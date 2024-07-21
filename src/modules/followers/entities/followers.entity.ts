import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Followers')
export class FollowersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  followDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followerId' })
  follower: UserEntity;

  @Column()
  followerId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingId' })
  following: UserEntity;

  @Column()
  followingId: string;
}
