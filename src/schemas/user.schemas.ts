import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address } from './address.schemas';
enum Gender {
  Male = 'Male',
  Female = 'Female',
  Others = 'Others',
}
@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  mobile: string;
  @Prop()
  gender: Gender;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address?: Address;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
