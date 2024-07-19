import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FavouritesDto  {

@IsString()
@IsNotEmpty()
userId: string;

@IsString()
@IsNotEmpty()
postId: string;

@IsDate()
@IsNotEmpty()
creationDate: Date;
}