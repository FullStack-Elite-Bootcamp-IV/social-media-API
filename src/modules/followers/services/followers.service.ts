import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateFollowerDto,
  DeleteFollowerDto,
} from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(FollowersEntity)
    private readonly followerRepository: Repository<FollowersEntity>,
  ) {}

  // Function to create a new follower relationship
  async createFollower(
    createFollowerDto: CreateFollowerDto,
  ): Promise<FollowersEntity> {
    try {
      if (!createFollowerDto) {
        throw new HttpException(
          'Please provide all fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { followerId, followingId } = createFollowerDto;

      // Check if the follower relationship already exists
      const existingFollower = await this.followerRepository.findOne({
        where: { followerId, followingId },
      });

      if (existingFollower) {
        throw new HttpException(
          'Follower relationship already exists',
          HttpStatus.CONFLICT,
        );
      }

      // Create and save the new follower relationship
      const newFollower = this.followerRepository.create(createFollowerDto);
      return await this.followerRepository.save(newFollower);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Function to find all followings by follower ID
  async findFollowingsById(
    followerId: FollowersEntity['followerId'],
  ): Promise<string[]> {
    try {
      if (!followerId) {
        return [];
      }
      const followings = await this.followerRepository.find({
        where: { followerId },
      });

      if (!followings || followings.length === 0) {
        return [];
      }

      return followings.map((following) => following.followingId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Function to find followers by user ID
  async findFollowersByUser(
    followingId: FollowersEntity['followingId'],
  ): Promise<string[]> {
    try {
      if (!followingId) {
        return [];
      }
      const followers = await this.followerRepository.find({
        where: { followingId },
      });

      if (!followers || followers.length === 0) {
        return [];
      }

      return followers.map((follower) => follower.followerId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Function to delete a follower relationship
  async deleteFollower(deleteFollowerDto: DeleteFollowerDto): Promise<string> {
    try {
      if (!deleteFollowerDto) {
        throw new HttpException(
          'Please provide all fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { followerId, followingId } = deleteFollowerDto;

      // Find the specific follower relationship
      const follower = await this.followerRepository.findOne({
        where: { followerId, followingId },
      });

      if (!follower) {
        throw new HttpException('Follower not found', HttpStatus.NOT_FOUND);
      }

      // Remove the follower relationship
      await this.followerRepository.remove(follower);

      return 'Follower deleted';
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
