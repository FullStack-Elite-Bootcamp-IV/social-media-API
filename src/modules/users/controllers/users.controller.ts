/* // here we must create the user controller
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import path from 'path';

// @Controller('users')
// export class UsersController {
//     constructor(private readonly usersService: UsersService) {}

//     @Post('/create')
//     createUser() {
//     }

//     @Get('/getuser')
//     getuser(){
//     }

//     @Post('/login')
//     loginUser() {
//     }

//     @Post('/logout')
//     logoutUser() {
//     }

//     @Post('/modifydarkmode')
//     modifyDarkMode(){
//     }

//     @Patch('/modify')
//     modifyUser() {
//     }

    @Delete('/delete')
    deleteUser() {
    }
} */
