import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import * as bycryptjs from 'bcryptjs';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { catchError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<UserEntity | Error> {
    try {
      const userEmail = await this.getByEmail(userDto.email);
      const userName = await this.getUserByUserName(userDto.username)
      if (userEmail || userName) {

      const error = new HttpException(
          'User already exists',
          HttpStatus.BAD_REQUEST
        );

        return error;
      }
      
      userDto.password = await bycryptjs.hash(userDto.password, 10);
      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      return error;
    }
  }

 async getUsers () {
   try {
     const users = await this.userRepository.find()
     if(!users){
      throw new Error('Users not found');
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

  async editProfile(userId: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if(!user){
      throw new Error('User not found')
    }
    Object.assign(user, userDto);
    return await this.userRepository.save(user);
  }
  
  async setDarkMode(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if(!user){
      throw new Error('User Not found');
    }
    user.darkMode = !user.darkMode;
    await this.userRepository.save(user);
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