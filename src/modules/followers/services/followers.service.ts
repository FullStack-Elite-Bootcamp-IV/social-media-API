import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateFollowerDto,
  DeleteFollowerDto,
} from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(FollowersEntity)
    private readonly followerRepository: Repository<FollowersEntity>,
  ) {}

  // Function to create a new follower
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

      // Verifica si la relación específica ya existe en la tabla Followers
      const existingFollower = await this.followerRepository.findOne({
        where: { followerId, followingId },
      });

      if (existingFollower) {
        throw new HttpException(
          'Follower relationship already exists',
          HttpStatus.CONFLICT,
        );
      }

      // Crea y guarda la nueva relación
      const newFollower = this.followerRepository.create(createFollowerDto);

      return await this.followerRepository.save(newFollower);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Function to find all followings by follower ID
  async findFollowingsById(
    followerId: FollowersEntity['followerId'],
  ): Promise<String[]> {
    try {
      if (!followerId) {
        throw new HttpErrorByCode[400]('please provide all fields');
      }
      const followings = await this.followerRepository.find({
        where: { followerId: followerId },
      });

      if (!followings || followings.length === 0) {
        throw new Error('No followings found for the provided followerId');
      }

      const result = followings.map((following) => following.followingId);

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to find followers by user ID
  async findFollowersByUser(
    followingID: FollowersEntity['followingId'],
  ): Promise<String[]> {
    try {
      if (!followingID) {
        throw new HttpErrorByCode[400]('please provide all fields');
      }
      const followers = await this.followerRepository.find({
        where: { followingId: followingID },
      });
      if (!followers) {
        throw new Error('No followers found for the provided userId');
      }

      const result = followers.map((follower) => follower.followerId);

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to delete a follower by ID
  async deleteFollower(deleteFollowerDto: DeleteFollowerDto): Promise<string> {
    try {
      if (!deleteFollowerDto) {
        throw new HttpException(
          'Please provide all fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { followerId, followingId } = deleteFollowerDto;

      // Encuentra la relación específica en la tabla Followers
      const follower = await this.followerRepository.findOne({
        where: { followerId, followingId },
      });

      if (!follower) {
        throw new HttpException('Follower not found', HttpStatus.NOT_FOUND);
      }

      // Elimina la relación
      await this.followerRepository.remove(follower);

      return 'Follower deleted';
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
