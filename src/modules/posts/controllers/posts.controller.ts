import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { LikesService } from 'src/modules/likes/services/likes.service';
import { LikeEntity } from 'src/modules/likes/entities/like.entity';
import { CreateLikeDto } from 'src/modules/likes/dto/create-like.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService, 
    private readonly likesService: LikesService
  ) {}

  // Create a new post
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Create a new post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Create a new post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Create a new post'
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  // Find a post by its ID
  @Get(':id')
  findPostById(@Param('id') postId: string): Promise<PostEntity> {
    return this.postsService.findPostById(postId);
  }

  // Update a post by its ID
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Update a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Update a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Update a post'
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updatePost(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  // Delete a post by its ID
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Delete a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Delete a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Delete a post'
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') postId: string): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  // Like a post
  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Like a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Like a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Like a post'
  })
  @Post('like')
  @UseGuards(JwtAuthGuard)
  likePost(@Body() createLikeDto: CreateLikeDto): Promise<void> {
    return this.postsService.likePost(createLikeDto);
  }

  // Unlike a post
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Unlike a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Unlike a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Unlike a post'
  })
  @Post('unlike')
  @UseGuards(JwtAuthGuard)
  unlikePost(@Body() createLikeDto: CreateLikeDto): Promise<any> {
    return this.postsService.unlikePost(createLikeDto);
  }

  // Find posts by user ID
  @ApiOperation({ summary: 'Find posts by user' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find posts by user'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find posts by user'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find posts by user'
  })
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findPostsByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findPostsByUser(userId);
  }

  // Find posts visible to a specific user
  @ApiOperation({ summary: 'Find posts visible to user' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find posts visible to user'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find posts visible to user'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find posts visible to user'
  })
  @Get('user/:userId/visible')
  @UseGuards(JwtAuthGuard)
  findPostsVisibleToUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findPostsVisibleToUser(userId);
  }

  // Find posts of a specific followed user
  @ApiOperation({ summary: 'Find posts of followed user' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find posts of followed user'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find posts of followed user'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find posts of followed user'
  })
  @Get('followed/:followerId/:followedUserId')
  @UseGuards(JwtAuthGuard)
  async findPostsOfFollowedUser(
    @Param('followerId') followerId: string,
    @Param('followedUserId') followedUserId: string,
  ): Promise<PostEntity[]> {
    return await this.postsService.findPostsOfFollowedUser(followerId, followedUserId);
  }

  // Find paginated posts of followed users
  @ApiOperation({ summary: 'Find posts of followed users' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find posts of followed users'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find posts of followed users'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find posts of followed users'
  })
  @UseGuards(JwtAuthGuard)
  @Get('followed-post/:followerId/:page/:limit')
  async findPaginatedPosts(
    @Param() { followerId, page, limit }: { followerId: string; page: number; limit: number }
  ): Promise<object[]> {
    return await this.postsService.findPaginatedPosts(followerId, page, limit);
  }

  @ApiOperation({ summary: 'Find all posts' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find all posts'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find all posts'
  })
  @ApiResponse({
    status: 404,
    type: CreatePostDto,
    description: 'Posts not found'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find all posts'
  })
  @Get('search/:search')
  async searchPosts(@Param('search') search: string): Promise<PostEntity[]> {
    return this.postsService.postSearch(search);
  }

  @ApiOperation({ summary: 'Find all posts' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find all posts'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find all posts'
  })
  @ApiResponse({
    status: 404,
    type: CreatePostDto,
    description: 'Posts not found'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find all posts'
  })
  @Get('user/:id')
  findPostsByUserId(@Param('id') userId: string): Promise<PostEntity[]> {
    return this.postsService.postByUserLike(userId);
  }
}
