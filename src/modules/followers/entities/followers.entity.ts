// here define the followers entity
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';// if need more entity you can add here
import { UserEntity } from '../../users/entities/user.entity';

@Entity('followers')
export class FollowerEntity {
    // here define the followers entity
}
