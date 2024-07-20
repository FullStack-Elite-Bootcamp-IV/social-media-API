import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import * as bycryptjs from 'bcryptjs';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { catchError } from 'rxjs';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto) {
    try {
      const userEmail = this.userRepository.findOne({ where: { email: userDto.email } })
      const userName = this.userRepository.findOne({ where: { username: userDto.username } })
      if(userEmail){
        throw new Error('Email in use')
      }
      if(userName){
        throw new Error('Name in use')
      }
      if (userEmail || userName) {
        return;
      }

      userDto.password = await bycryptjs.hash(userDto.password, 20);

      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

 async getUsers () {
   try {
     const users = await this.userRepository.find()
     if(!users){
      throw new Error('Users not found')
     }
     return users
   } catch (error) {
     console.log(error)
     throw new Error(error);
   }
 }

  async getUserById (userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })
      if(!user){
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async getUserByUserName (userName: string) {
    try {
      const user = await this.userRepository.findOne({ where: { username: userName } })
      if(!user){
        throw new Error('User not found')
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } })
      if(!user){
        throw new Error('User not found')
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async modifyProfile(userDto: UserDto) {
    try {
      const user = this.userRepository.create(userDto)
      if(!user){
        throw new Error('User not found')
      }
      return await this.userRepository.save(user)
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }
  
  async setDarkMode(userDto: UserDto) {
    try {
      userDto.darkMode = !userDto.darkMode
      await this.userRepository.update({ id: userDto.id }, { darkMode: userDto.darkMode });
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }
  
  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.delete(id)
      if (!user) {
        throw new Error('User not found');
    }
    return user
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }
};