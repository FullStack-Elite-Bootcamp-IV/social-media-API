import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  async createUser(@Body() UserDto: UserDto): Promise<UserEntity> {
    return this.userService.createUser(UserDto);
  }

  @Get('/users')
  getUsers(): Promise<UserEntity[]> {
    try {
      return this.userService.getUsers();
    } catch (e) {
      console.error(e)
      throw new Error
    }
  }

  @Get('/users/:id')
  getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Get('/users/:username')
  getUserByUserName(@Param('username') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Post('/setDarkMode/:id')
  async modifyDarkMode(@Param('id') userId: string): Promise<void> {
    await this.userService.setDarkMode(userId);
  }

  @Patch(':id')
  async modifyUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    return await this.userService.editProfile(userId, userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<string> {
    await this.userService.deleteUser(userId);
    return "Usuario eliminado exitosamente";
  }
}