import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from 'src/schemas/post.schemas';
import { User } from 'src/schemas/user.schemas';
import { PostDto } from 'src/users/dto/PostDto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost(userId: string, postData: PostDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('errro finding you', 404);
    const newPostData = new this.postModel(postData);
    const savedPost = await newPostData.save();
    await user.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });
    return savedPost;
  }
  getallPost() {
    return this.postModel.find();
  }
  async getbyid(userid: string) {
    const user = await this.postModel.findById(userid);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async updatePost(postId: string, postData: PostDto) {
    return this.postModel.findByIdAndUpdate(postId, postData, { new: true });
  }
  deletePost(postId: string) {
    return this.postModel.findByIdAndDelete(postId);
  }
}
