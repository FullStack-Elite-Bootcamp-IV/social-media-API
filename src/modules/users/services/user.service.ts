import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<UserEntity | Error> {


    
    console.log("In createUser: userDto")
    try {
      console.log("Using repository to find -")
      const userEmail = await this.userRepository.findOne({ where: { email: userDto.email } });
      console.log("userEmail: ", userEmail)
      const userName = await this.userRepository.findOne({ where: { userName: userDto.userName } });
      console.log("userName: ", userName)
      if (userEmail || userName) {

      console.log("Reach exception")
      const error = new HttpException(
          'User already exists',
          HttpStatus.BAD_REQUEST
        );

        return error;
      }
      
      userDto.password = await bcrypt.hash(userDto.password, 10);

      // Hacemos la entidad manualmente
      const user = this.userRepository.create(userDto);
      const result = await this.userRepository.save(user);
      delete result.password;
      return result
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
      const user = await this.userRepository.findOne({ where: { userId: userId } })
      if(!user){
        throw new Error('User not found')
      }
      delete user.password;
      return user
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async getUserByUserName (userName: string) {
    try {
      const user = await this.userRepository.findOne({ where: { userName: userName } })
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
      throw new Error(error);
    }
  }

  async editProfile(userId: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if(!user){
      throw new Error('User not found')
    }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    Object.assign(user, userDto);
    return await this.userRepository.save(user);
  }
  
  async setDarkMode(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if(!user){
      throw new Error('User Not found');
    }
    user.darkMode = !user.darkMode;
    await this.userRepository.save(user);
  }
  
  async deleteUser(id: string): Promise <object>{
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

  async updateLastLogout (email: string, date: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if(!user){
        throw new Error('User not found');
      }
      if(!date){
        throw new Error('Invalid date');
      }
      user.lastLogoutDate = date;
      
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }
};