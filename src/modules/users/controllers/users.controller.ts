import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags("User")
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // Get all users
  @ApiResponse({
    status: 200,
    description: 'Get all Users.',
    type: [UserEntity]
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Users not found.'
  })
  @Get()
  getUsers(): Promise<UserEntity[]> {
    try {
      return this.userService.getUsers();
    } catch (error) {
      console.error(error);
      throw new Error(); // Consider replacing with a more descriptive error message
    }
  }

  // Get user by username
  @ApiResponse({
    status: 200,
    description: 'Get user by username.',
    type: UserEntity
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  @Get('/by-username/:username')
  @UseGuards(JwtAuthGuard)
  getUserByUserName(@Param('username') username: string): Promise<UserEntity> {
    return this.userService.getUserByUserName(username);
  }

  // Set dark mode for the user
  @ApiResponse({
    status: 201,
    description: 'Set Dark mode.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @Post('/setDarkMode/:id')
  @UseGuards(JwtAuthGuard)
  async modifyDarkMode(@Param('id') userId: string): Promise<void> {
    return await this.userService.setDarkMode(userId);
  }

  // Update user information
  @ApiResponse({
    status: 200,
    description: 'User modified.',
    type: UserEntity
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async modifyUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    return await this.userService.editProfile(userId, userDto);
  }

  // Delete a user
  @ApiResponse({
    status: 200,
    description: 'User deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') userId: string): Promise<string> {
    await this.userService.deleteUser(userId);
    return "Usuario eliminado exitosamente";
  }


  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: 200,
    description: 'Search user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.'
  })
  @Get('search/:search')
  @UseGuards(JwtAuthGuard)
  async searchUser(@Param('search') search: string): Promise<UserEntity[]> {
    return await this.userService.searchUser(search);
  }
}
