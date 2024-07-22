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

  @Post()
  @UseGuards(JwtAuthGuard)
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
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a post by its ID' })
  @ApiResponse({
    status: 200,
    type: PostEntity,
    description: 'Find a post by its ID'
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.'
  })
  findPostById(@Param('id') postId: string): Promise<PostEntity> {
    return this.postsService.findPostById(postId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    type: PostEntity,
    description: 'Update a post'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Update a post'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Update a post'
  })
  updatePost(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'Delete a post'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Delete a post'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Delete a post'
  })
  deletePost(@Param('id') postId: string): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({
    status: 200,
    description: 'Like a post'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Like a post'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Like a post'
  })
  likePost(@Body() createLikeDto: CreateLikeDto): Promise<void> {
    return this.postsService.likePost(createLikeDto);
  }

  @Post('unlike')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({
    status: 200,
    description: 'Unlike a post'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Unlike a post'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Unlike a post'
  })
  unlikePost(@Body() createLikeDto: CreateLikeDto): Promise<any> {
    return this.postsService.unlikePost(createLikeDto);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find posts by user' })
  @ApiResponse({
    status: 200,
    type: [PostEntity],
    description: 'Find posts by user'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Find posts by user'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Find posts by user'
  })
  findPostsByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findPostsByUser(userId);
  }

  @Get('user/:userId/visible')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find posts visible to user' })
  @ApiResponse({
    status: 200,
    type: [PostEntity],
    description: 'Find posts visible to user'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Find posts visible to user'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Find posts visible to user'
  })
  findPostsVisibleToUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findPostsVisibleToUser(userId);
  }

  @Get('followed/:followerId/:followedUserId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find posts of followed user' })
  @ApiResponse({
    status: 200,
    type: [PostEntity],
    description: 'Find posts of followed user'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Find posts of followed user'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Find posts of followed user'
  })
  async findPostsOfFollowedUser(
    @Param('followerId') followerId: string,
    @Param('followedUserId') followedUserId: string,
  ): Promise<PostEntity[]> {
    return await this.postsService.findPostsOfFollowedUser(followerId, followedUserId);
  }

  @Get('followed-post/:followerId/:page/:limit')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find paginated posts of followed users' })
  @ApiResponse({
    status: 200,
    type: [PostEntity],
    description: 'Find paginated posts of followed users'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Find paginated posts of followed users'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Find paginated posts of followed users'
  })
  async findPaginatedPosts(
    @Param() { followerId, page, limit }: { followerId: string; page: number; limit: number }
  ): Promise<object[]> {
    return await this.postsService.findPaginatedPosts(followerId, page, limit);
  }

  @Get('search/:search')
  @ApiOperation({ summary: 'Find all posts' })
  @ApiResponse({
    status: 200,
    type: [PostEntity],
    description: 'Find all posts'
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST: Find all posts'
  })
  @ApiResponse({
    status: 404,
    description: 'Posts not found'
  })
  @ApiResponse({
    status: 500,
    description: 'INTERNAL SERVER ERROR: Find all posts'
  })
  async searchPosts(@Param('search') search: string): Promise<PostEntity[]> {
    return this.postsService.postSearch(search);
  }
}
