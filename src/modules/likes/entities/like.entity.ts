// here define the like entity
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    postId : string;

    @Column({type: 'varchar'})
    userId : string;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    creationDate: Date;

    @ManyToOne(type => PostEntity, post => post.likes)
    post: PostEntity [];

    @ManyToOne(type => PostEntity, post => post.userId)
    user: UserEntity [];
}
