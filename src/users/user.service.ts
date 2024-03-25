import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Address } from 'src/schemas/address.schemas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async createUser({ address, ...user }: CreateUserDto) {
    const access_token = await this.jwtService.signAsync(user);
    if (address) {
      const addressStored = new this.addressModel(address);
      const addressSaved = await addressStored.save();
      const newUser = new this.userModel({
        ...user,
        address: addressSaved._id,
      });
      newUser.save();

      return {
        token: access_token,
        data: newUser,
      };
    }
    // if Address not passed directly jumped here and save other data ;
    const newUser = new this.userModel(user);
    return {
      token: access_token,
      data: newUser,
    };
  }
  getAllUsers() {
    return this.userModel.find().populate('address');
  }
  getById(userId: string) {
    const singleUser = this.userModel
      .findById(userId)
      .populate(['address', 'posts']);
    // console.log('this', singleUser);
    return singleUser;
  }
  async updateUser(userId: string, { address, ...updatedUser }: UpdateUserDto) {
    if (address) {
      const useraddress = new this.addressModel(address);
      const storeUpdatedAddress = await useraddress.save();
      const updatedUser = this.userModel.findByIdAndUpdate(
        userId,
        {
          ...UpdateUserDto,
          address: storeUpdatedAddress,
        },
        { new: true },
      );
      return updatedUser;
    }
    return this.userModel.findByIdAndUpdate(userId, updatedUser, { new: true });
  }
  deleteById(userId: string) {
    return this.userModel.findByIdAndDelete(userId, { new: true });
  }
}
