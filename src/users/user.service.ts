import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  getAllUsers() {
    return this.userModel.find();
  }
  getById(userId: string) {
    const singleUser = this.userModel.findById(userId);
    // console.log('this', singleUser);
    return singleUser;
  }
  async updateUser(userId: string, updatedUser: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, updatedUser, { new: true });
  }
}
