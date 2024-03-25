import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { PostDto } from 'src/users/dto/PostDto';
import { PostService } from './posts.service';
import { Postpipe } from './pipe/post.pipe';

@Controller('post')
export class PostsController {
  constructor(private postService: PostService) {}

  @Post(':userId')
  createPost(
    @Param('userId') userId: string,
    @Body(new Postpipe()) postData: PostDto,
  ) {
    return this.postService.createPost(userId, postData);
  }
  @Get('all')
  getPost() {
    return this.postService.getallPost();
  }
  @Get(':id')
  getsingle(
    @Param('id', new ParseUUIDPipe())
    userid: string,
  ) {
    return this.postService.getbyid(userid);
  }
  @Put(':id')
  updatePost(@Param('id') postId: string, @Body() postData: PostDto) {
    return this.postService.updatePost(postId, postData);
  }
  @Delete(':id')
  detePost(@Param('id') userid: string) {
    return this.postService.deletePost(userid);
  }
}
