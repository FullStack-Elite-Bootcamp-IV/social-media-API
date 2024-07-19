// here define the like entity
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    postId : string;

    @Column()
    userId : string;

    @Column()
    creationDate: Date;

    @ManyToOne(type => PostEntity, post => post.likes)
    post: PostEntity [];

    @ManyToOne(type => PostEntity, post => post.userId)
    user: UserEntity [];
}
