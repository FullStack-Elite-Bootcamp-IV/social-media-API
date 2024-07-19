/* import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,    
        private readonly configService: ConfigService
    ) {}

    // Here is the services of user 

    // first create user
        // IN this service i need a function to create a user
    // the name is createUser and the parameter is UserDto

    async createUser(user: UserDto) {
    }

    // second login user
    // the name is loginUser and the parameter is UserDto

    async loginUser(user: UserDto) {
    }

    // logaut user
    // the name is logoutUser and the parameter is UserDto

    async logoutUser(user: UserDto) {
    }

    // get user 
    // the name is getUser and the parameter is UserDto

    async getUser(user: UserDto) {
    }

    // modify user
    // the name is modifyUser and the parameter is UserDto

    async modifyUser(user: UserDto) {
    }

    // delete user
    // the name is deleteUser and the parameter is UserDto

    async deleteUser(user: UserDto) {
    }

    // modify the state of a darkMode 

    async modifyDarkMode(user: UserDto) {
    }
}

 */