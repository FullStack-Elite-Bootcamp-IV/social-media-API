import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Followers')
export class FollowersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  followerId: string;
    
  @Column()
  followingId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  followDate: Date;
  
  @ManyToOne(() => UserEntity, user => user.userId, { nullable: false, onDelete: 'CASCADE' })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, user => user.userId, { nullable: false, onDelete: 'CASCADE' })
  following: UserEntity;
}
