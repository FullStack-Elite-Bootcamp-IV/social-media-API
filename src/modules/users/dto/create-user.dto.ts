// here you must tyo create the user dto

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends PartialType(UserEntity) {
}