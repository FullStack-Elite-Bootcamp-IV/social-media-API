import { HttpException, Injectable, Post, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { FollowersService } from 'src/modules/followers/services/followers.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly followerService: FollowersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) { }

 async getUsers () {
   try {
     const users = await this.userRepository.find()
     if(!users){
      throw new Error('Users not found');
     }
     return users
   } catch (error) {
    throw new Error(error);
   }
 }

  async getUserById(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: userId },
      });
      if (!user) {
        throw new Error('User not found')
      }
      delete user.password;
      return user
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async getUserByUserName(userName: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { userName: userName },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProfileInfoByUserName(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { userName: username },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const { userId, profileImage, coverImage, userName, fullName, age, gender } =
        user;
      const userPost = await this.postRepository.find({
        where: { userId: user.userId },
      });
      const posts = userPost.length;
      const follower = await this.followerService.findFollowersByUser(
        user.userId,
      );
      const following = await this.followerService.findFollowingsById(
        user.userId,
      );
      const followers = follower.length;
      const followings = following.length;

      return {
        userId,
        profileImage,
        coverImage,
        userName,
        fullName,
        age,
        gender,
        posts,
        followers,
        followings,
        userPost,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async editProfile(userId: string, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (userDto.userName) {
      user.userName = userDto.userName;
    }
    if (userDto.fullName) {
      user.fullName = userDto.fullName;
    }
    if (userDto.age) {
      user.age = userDto.age;
    }
    if (userDto.email) {
      user.email = userDto.email;
    }
    if(userDto.password) {
      user.password = await bcryptjs.hash(userDto.password, 10);
    }
    if (userDto.gender) {
      user.gender = userDto.gender;
    }
    if (userDto.profileImage) {
      user.profileImage = userDto.profileImage;
    }
    if (userDto.coverImage) {
      user.coverImage = userDto.coverImage;
    }
    if (userDto.description) {
      user.description = userDto.description;
    }
    if (userDto.workPlace) {
      user.workPlace = userDto.workPlace;
    }
    if (userDto.personalWebSite) {
      user.personalWebSite = userDto.personalWebSite;
    }
    if (userDto.location) {
      user.location = userDto.location;
    }
    if (userDto.college) {
      user.college = userDto.college;
    }
    return await this.userRepository.save(user);
  }

  async setDarkMode(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error('User Not found');
    }
    user.darkMode = !user.darkMode;
    await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<object> {
    try {
      const user = await this.userRepository.delete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateLastLogout(email: string, date: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
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
      const usersFiltered = users.filter((user) => {
        const userNameWords = user.userName.split(' ');
        return subStrings.every((subString) => {
          return userNameWords.some((word) =>
            word.toLowerCase().includes(subString.toLowerCase()),
          );
        });
      });
      if (!usersFiltered) {
        throw new HttpException('Users not found', 404);
      }
      return usersFiltered;
    } catch (error) {
      throw new HttpException('server error', 500);
    }
  }
}
