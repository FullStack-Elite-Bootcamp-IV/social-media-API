import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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

  // Retrieves a user by their ID
  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { userId: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Retrieves a user by their username
  async getUserByUserName(userName: string) {
    try {
      const user = await this.userRepository.findOne({ where: { userName: userName } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Retrieves a user by their email address
  async getByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Updates a user's profile with the provided DTO
  async editProfile(userId: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, userDto); // Merge the DTO into the existing user entity
    return await this.userRepository.save(user);
  }

  // Toggles the dark mode setting for a user
  async setDarkMode(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.darkMode = !user.darkMode; // Toggle dark mode
    await this.userRepository.save(user);
  }

  // Deletes a user by their ID
  async deleteUser(id: string): Promise<object> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) { // Check if the deletion was successful
        throw new Error('User not found');
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // Updates the last logout date for a user
  async updateLastLogout(email: string, date: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) {
        throw new Error('User not found');
      }
      if (!date) {
        throw new Error('Invalid date');
      }
      user.lastLogoutDate = date; // Set the last logout date
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
