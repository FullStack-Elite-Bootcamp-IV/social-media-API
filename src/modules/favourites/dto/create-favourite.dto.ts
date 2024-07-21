import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class FavouritesDto {

@ApiProperty()
@IsString()
@IsNotEmpty()
userId: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
postId: string;

@ApiProperty()
@IsDate()
@IsNotEmpty()
creationDate?: Date;
}