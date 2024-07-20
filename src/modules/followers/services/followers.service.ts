// src/modules/followers/services/followers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(FollowersEntity)
    private readonly followerRepository: Repository<FollowersEntity>
  ) {}

  // Function to create a new follower
  async createFollower(createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> { 
    try{
      console.log(createFollowerDto);
      if(!createFollowerDto) {
        throw new HttpErrorByCode[400]('please provide all fields');
      };
      const follower =  this.followerRepository.create(createFollowerDto);
      if(!follower) {
        throw new Error('Follower not created error from createFollower');
      };
  
      return await this.followerRepository.save(follower);
    }
    catch(err){
      console.log(err);
      throw new Error(err);
    }
   }

  // Function to find all followings by follower ID
  async findFollowingsById(followerId: FollowersEntity['followerId']): Promise<String[]> {
    try{
      if(!followerId) {
        throw new HttpErrorByCode[400]('please provide all fields');
      };
      const followings = await this.followerRepository.find({ where: { followerId: followerId } });
    
      if (!followings || followings.length === 0) {
        throw new Error('No followings found for the provided followerId');
      }
  
      const result = followings.map(following => following.followingId);
      
      return result;
    }
    catch(err){
      throw new Error(err);
    }
  }

  // Function to find followers by user ID
  async findFollowersByUser(followingID: FollowersEntity['followingId']): Promise<String[]> { 
    try{
      if(!followingID) {
        throw new HttpErrorByCode[400]('please provide all fields');
      };
      const followers = await this.followerRepository.find({ where: { followingId: followingID } });
      if(!followers) {
        throw new Error('No followers found for the provided userId');
      };
  
      const result = followers.map(follower => follower.followerId);
  
      return result;
    }
    catch(err){
      throw new Error(err);
    }
   }

  // Function to delete a follower by ID
  async deleteFollower(followerId: string): Promise<string> { 
    try{
      if(!followerId) {
        throw new HttpErrorByCode[400]('please provide all fields');
      };
      const follower = await this.followerRepository.findOneBy({id: followerId});
      if(!follower) {
        throw new Error('Follower not found');
      };
      // delete follower
      const deleted = await this.followerRepository.remove(follower);
      if(!deleted) {
        throw new Error('Follower not deleted');
      };
      return 'Follower deleted';
    }
    catch(err){
      throw new Error(err);
    }
  }
 }