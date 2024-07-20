import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Followers')
export class FollowersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
    follower: UserEntity;

    @Column()
    followerId: string;

    @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
    following: UserEntity;

    @Column()
    followingId: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    followDate: Date;
}
