import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Posts } from 'src/schemas/post.schemas';
import { User, UserSchema } from 'src/schemas/user.schemas';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Posts.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostModule {}
