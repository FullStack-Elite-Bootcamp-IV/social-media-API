// here to build the user entity

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dto/create-user.dto';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
}