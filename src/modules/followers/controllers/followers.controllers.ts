import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FollowersService } from '../services/followers.service';
import { CreateFollowerDto, DeleteFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags("Followers")
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) { }

  @ApiResponse({
    status: 201,
    description: 'New follow.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createFollower(@Body() createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> {
    // Handles the creation of a new follower relationship
    return this.followersService.createFollower(createFollowerDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all users that I am following.',
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
    description: 'Followers not found.'
  })
  @Get('followings/:followerId')
  @UseGuards(JwtAuthGuard)
  findFollowingsById(@Param('followerId') followerId: string): Promise<String[]> {
    // Retrieves a list of users that the specified user is following
    return this.followersService.findFollowingsById(followerId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all followers that follow me.',
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
    description: 'Followers not found.'
  })
  @Get('/user/:followingId')
  @UseGuards(JwtAuthGuard)
  findFollowersByUser(@Param('followingId') followingId: string): Promise<String[]> {
    // Retrieves a list of users who are following the specified user
    return this.followersService.findFollowersByUser(followingId);
  }

  @ApiResponse({
    status: 200,
    description: 'Unfollow.',
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
    description: 'Follow not found.'
  })
  @Delete('/delete')
  @UseGuards(JwtAuthGuard) 
  deleteFollower(@Body() deleteFollowerDto: DeleteFollowerDto): Promise<String> {
    // Handles the removal of a follower relationship
    return this.followersService.deleteFollower(deleteFollowerDto);
  }
}
