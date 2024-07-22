import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FollowersService } from '../services/followers.service';
import { CreateFollowerDto, DeleteFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { ChatService } from '../../chats/services/chats.service';
@ApiTags("Followers")
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService, private readonly chatService: ChatService) { }

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
  async createFollower(@Body() createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> {
    // Handles the creation of a new follower relationship
    
    const follower = await  this.followersService.createFollower(createFollowerDto);
    try{
      const followerFollowers = await this.followersService.findFollowersByUser(createFollowerDto.followerId);
      if(followerFollowers.includes(follower.followingId) ){
        console.log(followerFollowers)
        console.log(follower.followerId)
        console.log(follower.followingId)
        await this.chatService.createChat({ user1Id: follower.followingId,  user2Id: follower.followerId});
      }
    }catch{
      
    }
    
    return follower;
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
