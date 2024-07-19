import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FollowersService } from '../services/followers.service';
import { CreateFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

   @Post()
  createFollower(@Body() createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> {
    return this.followersService.createFollower(createFollowerDto);
  }

  // here we can to find a users that i am following
  @Get('followings/:followerId')
   findFollowingsById(@Param('followerId') followerId: string): Promise<String[]> { 
      return this.followersService.findFollowingsById(followerId);
    }
 
  // here we can find all followers that follow me 
   @Get('followers/:followingId')
  findFollowersByUser(@Param('followingId') followingId: string): Promise<String[]> { 
      return this.followersService.findFollowersByUser(followingId);
  }


  @Delete(':followerId') // is like unfollow 
  deleteFollower(@Param('followerId') followerId: string): Promise<String> {
      return this.followersService.deleteFollower(followerId);
  }
}
