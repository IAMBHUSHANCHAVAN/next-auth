import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PostDto } from 'src/users/dto/PostDto';
import { PostService } from './posts.service';

@Controller('post')
export class PostsController {
  constructor(private postService: PostService) {}

  @Post(':userId')
  createPost(@Param('userId') userId: string, @Body() postData: PostDto) {
    return this.postService.createPost(userId, postData);
  }
  @Get()
  getPost() {
    return {};
  }
}
