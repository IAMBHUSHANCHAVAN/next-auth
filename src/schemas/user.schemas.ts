import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
enum Gender {
  Male,
  Female,
  Others,
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
  @Prop()
  address: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
