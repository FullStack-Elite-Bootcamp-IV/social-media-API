import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';// if need more entity you can add here 
import { UserEntity } from '../../users/entities/user.entity';

@Entity('messages')
export class MessageEntity {
    // here define the message entity
}
