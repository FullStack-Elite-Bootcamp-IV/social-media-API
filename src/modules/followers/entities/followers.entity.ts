import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Followers')
export class FollowersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
    @JoinColumn({ name: 'followerId' })
    follower: UserEntity['id'];

    @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
    @JoinColumn({ name: 'followingId' })
    following: UserEntity['id'];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    followDate: Date;
}
