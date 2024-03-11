import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Address } from 'src/schemas/address.schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async createUser({ address, ...createUserDto }: CreateUserDto) {
    if (address) {
      const addressStored = new this.addressModel(address);
      const addressSaved = await addressStored.save();
      const newUser = new this.userModel({
        ...createUserDto,
        address: addressSaved._id,
      });
      return newUser.save();
    }
    // if Address not passed directly jumped here and save other data ;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
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
