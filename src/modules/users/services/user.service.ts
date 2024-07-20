import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import * as bycryptjs from 'bcryptjs';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { catchError } from 'rxjs';

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
      if (userEmail || userName) {
        return;
      }

      userDto.password = await bycryptjs.hash(userDto.password, 20);

      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

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

  async getByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email: email } })
    } catch (error) {
      console.log(error)
    }
  }

  async editProfile(userId: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    Object.assign(user, userDto);
    return await this.userRepository.save(user);
  }
  
  async setDarkMode(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    user.darkMode = !user.darkMode;
    await this.userRepository.save(user);
  }
  
  async deleteUser(id: string) {
    try {
      return await this.userRepository.delete(id)
    } catch (error) {
      console.log(error)
    }
  }
};