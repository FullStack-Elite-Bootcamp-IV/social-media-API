

import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { PostEntity } from 'src/modules/posts/entities/post.entity';

export class FavouritesDto  {

@IsString()
@IsNotEmpty()
userId: UserEntity;

@IsString()
@IsNotEmpty()
postId: PostEntity;

@IsDate()
@IsNotEmpty()
creationDate: Date;
}