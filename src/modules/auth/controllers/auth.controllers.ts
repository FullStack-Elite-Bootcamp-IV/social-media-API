import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class authController {
    constructor(private readonly AuthService: AuthService) {}

    @Post('/login')
    login(){

    }


}