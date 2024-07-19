import { PartialType } from '@nestjs/mapped-types';
import { CommentsEntity } from '../entities/comment.entity';

export class CommentsDto extends PartialType(CommentsEntity) {

}