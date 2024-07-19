import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class FavouritesDto {

@IsString()
@IsNotEmpty()
id?: string;

@IsString()
@IsNotEmpty()
userId: string;

@IsString()
@IsNotEmpty()
postId: string;

@IsDate()
@IsNotEmpty()
creationDate?: Date;
}