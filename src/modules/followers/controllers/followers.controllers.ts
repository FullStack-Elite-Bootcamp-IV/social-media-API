import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FollowersService } from '../services/followers.service';
import { CreateFollowerDto } from '../dto/create-follower.dto';
import { FollowerEntity } from '../entities/follower.entity';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  // @Post()
  // createFollower(@Body() createFollowerDto: CreateFollowerDto): Promise<FollowerEntity> { ... }

  // @Get(':id')
  // findFollowerById(@Param('id') followerId: string): Promise<FollowerEntity> { ... }

  // @Get()
  // findAllFollowers(): Promise<FollowerEntity[]> { ... }

  // @Delete(':id') // is as unfollow 
  // deleteFollower(@Param('id') followerId: string): Promise<void> { ... }

  // @Get('followers/:userId')
  // findFollowersByUser(@Param('userId') userId: string): Promise<FollowerEntity[]> { ... }

}
