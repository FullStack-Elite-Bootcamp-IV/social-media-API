import { Injectable } from '@nestjs/common';
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
    /* private readonly jwtService: JwtService,    
    private readonly configService: ConfigService */
  ) {}

  async createUser(userDto: UserDto) {
    try {
      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

    // second login user
    // the name is loginUser and the parameter is UserDto

/*   async loginUser(userDto: UserDto) {
    try {
      const 
    } catch (error) {
      console.log(error);
    }
  } */

    // logaut user
    // the name is logoutUser and the parameter is UserDto

/*   async logoutUser(userDto: UserDto) {
  } */
 async getUsers () {
   try {
     return await this.userRepository.find()
   } catch (error) {
     console.log(error)
   }
 }

  async getUserById (userId: string) {
    try {
      return await this.userRepository.findOne({ where: { id: userId } })
    } catch (error) {
      console.log(error)
    }
  }

  async getUserByUserName (userName: string) {
    try {
      return await this.userRepository.findOne({ where: { username: userName } })
    } catch (error) {
      console.log(error)
    }
  }

  async modifyProfile(userDto: UserDto) {
    try {
      const user = this.userRepository.create(userDto)
      return await this.userRepository.save(user)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.userRepository.delete(id)
    } catch (error) {
      console.log(error)
    }
  }

  async setDarkMode(userDto: UserDto) {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }
};