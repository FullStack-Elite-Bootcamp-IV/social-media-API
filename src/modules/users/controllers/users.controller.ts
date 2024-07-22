import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import {
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all users.',
    type: [UserEntity],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Users not found.',
  })
  getUsers(): Promise<UserEntity[]> {
    try {
      return this.userService.getUsers();
    } catch (error) {
      console.error(error);
      throw new Error(); // Consider replacing with a more descriptive error message
    }
  }

  @Get('/by-username/:username')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by username' })
  @ApiResponse({
    status: 200,
    description: 'Get user by username.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  getUserByUserName(@Param('username') username: string): Promise<UserEntity> {
    return this.userService.getUserByUserName(username);
  }

  @Get('/profile-info/:userName')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'User ID',
  })
  @ApiOperation({ summary: 'Get user profile information by ID' })
  @ApiResponse({
    status: 200,
    description: 'User profile information retrieved successfully',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  getProfileInfoByUserName(@Param('userName') userName: string) {
    return this.userService.getProfileInfoByUserName(userName);
  }

  @Post('/setDarkMode/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Set dark mode for user' })
  @ApiResponse({
    status: 200,
    description: 'Set dark mode.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  async modifyDarkMode(@Param('id') userId: string): Promise<void> {
    return await this.userService.setDarkMode(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user information' })
  @ApiResponse({
    status: 200,
    description: 'User modified.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async modifyUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    return await this.userService.editProfile(userId, userDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async deleteUser(@Param('id') userId: string): Promise<string> {
    await this.userService.deleteUser(userId);
    return 'Usuario eliminado exitosamente';
  }

  @Get('search/:search')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOperation({ summary: 'Search user' })
  @ApiResponse({
    status: 200,
    description: 'Search user.',
    type: [UserEntity],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async searchUser(@Param('search') search: string): Promise<UserEntity[]> {
    return await this.userService.searchUser(search);
  }
}
