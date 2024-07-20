// here define the like entity
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    creationDate: Date;
    
    @ManyToOne(() => PostEntity, post => post.id, { onDelete: 'CASCADE' })
    postId : PostEntity;

    @ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE' })
    userId : UserEntity;
}
