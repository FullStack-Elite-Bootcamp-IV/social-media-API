// here we must create the user controller
 import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
 import { UserDto } from '../dto/create-user.dto';
 import { UserEntity } from '../entities/user.entity';
 import path from 'path';

 @Controller('users')
 export class UsersController {
   constructor(private readonly UserService: UserService) {}
   
   @Post('/register')
   async createUser(@Body() UserDto: UserDto): Promise<UserEntity> {
     return this.UserService.createUser(UserDto);
   }

   /*@Get('/comment:id')
  async getCommentById(@Param('id') postId: string): Promise<CommentsEntity[]> {
    return this.CommentsService.getCommentsbyId(postId);
  }*/

   @Get('/users')
   getUsers(): Promise<UserEntity[]> {
    try{
      return this.UserService.getUsers();
    }catch(e){
      console.error(e)
      throw new Error
    }
   }

   @Get('/users:id')
   getUserById(@Param('id') id: string): Promise<UserEntity> {
    try{
      return this.UserService.getUserById(id);
    }catch(e){
      console.error(e)
      throw new Error
    }
   }

   @Get('/users/username')
   getUserByUserName(@Param('username') id: string): Promise<UserEntity> {
    try{
      return this.UserService.getUserById(id);
    }catch(e){
      console.error(e)
      throw new Error
    }
   }

   // @Post('/login')
   // loginUser() {}

   @Post('/setDarkMode')
   modifyDarkMode() {}

   @Patch('/editProfile')
   modifyUser() {}

   @Delete('/delete')
   deleteUser() {}
 }