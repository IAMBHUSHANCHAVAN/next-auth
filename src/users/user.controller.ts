import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import mongoose from 'mongoose';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private userservice: UserService) {}

  @Post()
  //   @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('dto', createUserDto);
    return this.userservice.createUser(createUserDto);
  }
  @Get('all')
  getAllUsers() {
    return this.userservice.getAllUsers();
  }
  @Get(':userId')
  getById(@Param('userId') userId: string) {
    return this.userservice.getById(userId);
  }
  @Patch(':userid')
  updateUser(@Body() updateUser: UpdateUserDto, @Param('userid') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('user not found', 404);
    return this.userservice.updateUser(id, updateUser);
  }
  @Delete(':userid')
  deleteById(@Param('userid') userId: string) {
    return this.userservice.deleteById(userId);
  }
}
