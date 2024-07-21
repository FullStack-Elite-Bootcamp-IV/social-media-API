import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  // Retrieves all users
  async getUsers() {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new Error('Users not found');
      }
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUserByUserName(userName: string) {
    try {
      const user = await this.userRepository.findOne({ where: { userName: userName } })
      if (!user) {
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
      if (!user) {
        throw new Error('User not found')
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editProfile(userId: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found')
    }
    Object.assign(user, userDto);
    return await this.userRepository.save(user);
  }

  async setDarkMode(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User Not found');
    }
    user.darkMode = !user.darkMode;
    await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<object> {
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

  async updateLastLogout(email: string, date: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) {
        throw new Error('User not found');
      }
      if (!date) {
        throw new Error('Invalid date');
      }
      user.lastLogoutDate = date;

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async searchUser(search: string): Promise<UserEntity[]> {
    try {
      if (!search) {
        throw new HttpException('search not found', 400);
      }
      const subStrings = search.split(' ');
      const users = await this.userRepository.find();
      const usersFiltered = users.filter(user => {
        const userNameWords = user.userName.split(' ');
        return subStrings.every(subString => {
          return userNameWords.some(word => word.toLowerCase().includes(subString.toLowerCase()));
        });
      });
      if (!usersFiltered) {
        throw new HttpException('Users not found', 404);
      }
      return usersFiltered;
    } catch (error) {
      console.log(error)
      throw new HttpException('server error', 500);
    }
  }
};
