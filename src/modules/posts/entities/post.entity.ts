// here define the post entity
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('posts')
export class PostEntity {
    // here define the post entity whit the properties based on the data base
}
