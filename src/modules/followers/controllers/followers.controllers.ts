import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FollowersService } from '../services/followers.service';
import { CreateFollowerDto, DeleteFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { ChatService } from '../../chats/services/chats.service';

@ApiTags('Followers') // Tag for grouping related API endpoints in Swagger
@Controller('followers') // Base route for the followers controller
export class FollowersController {
  constructor(
    private readonly followersService: FollowersService,
    private readonly chatService: ChatService
  ) {}

  @Post() // HTTP POST method to create a new follower relationship
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Create a new follower relationship', // Brief description of the operation
    description: 'Handles the creation of a new follower relationship. If the newly followed user is also following the current user, a chat is created between the two users.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 201,
    description: 'Follower relationship created successfully.', // Description for a successful creation
    type: FollowersEntity, // Data type returned
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided data.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  async createFollower(@Body() createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> {
    const follower = await this.followersService.createFollower(createFollowerDto);
    try {
      const followerFollowers = await this.followersService.findFollowersByUser(createFollowerDto.followerId);
      if (followerFollowers.includes(follower.followingId)) {
        await this.chatService.createChat({ user1Id: follower.followingId, user2Id: follower.followerId });
      }
    } catch {}

    return follower;
  }

  @Get('followings/:followerId') // HTTP GET method to retrieve all followings of a user
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Get all users that I am following', // Brief description of the operation
    description: 'Retrieves a list of users that the specified user is following.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 200,
    description: 'Followings retrieved successfully. Returns a list of user IDs.', // Description for a successful retrieval
    type: [String], // Data type returned (list of user IDs)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided follower ID.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Followers not found.', // Description when no followings are found
  })
  findFollowingsById(@Param('followerId') followerId: string): Promise<String[]> {
    return this.followersService.findFollowingsById(followerId);
  }

  @Get('/user/:followingId') // HTTP GET method to retrieve all followers of a user
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Get all followers of a user', // Brief description of the operation
    description: 'Retrieves a list of users who are following the specified user.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 200,
    description: 'Followers retrieved successfully. Returns a list of user IDs.', // Description for a successful retrieval
    type: [String], // Data type returned (list of user IDs)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided following ID.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Followers not found.', // Description when no followers are found
  })
  findFollowersByUser(@Param('followingId') followingId: string): Promise<String[]> {
    return this.followersService.findFollowersByUser(followingId);
  }

  @Delete('/delete') // HTTP DELETE method to remove a follower relationship
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @ApiOperation({
    summary: 'Unfollow a user', // Brief description of the operation
    description: 'Handles the removal of a follower relationship.', // Detailed description of the operation
  })
  @ApiResponse({
    status: 200,
    description: 'Follower relationship removed successfully. Returns a success message.', // Description for a successful removal
    type: String, // Data type returned (success message)
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the provided data.', // Description for a bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Access denied.', // Description for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Follow relationship not found.', // Description when the follow relationship is not found
  })
  deleteFollower(@Body() deleteFollowerDto: DeleteFollowerDto): Promise<String> {
    return this.followersService.deleteFollower(deleteFollowerDto);
  }
}
