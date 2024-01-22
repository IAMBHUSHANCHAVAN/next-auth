import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop()
  country: string;
  @Prop()
  postalCode: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  landmark: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
