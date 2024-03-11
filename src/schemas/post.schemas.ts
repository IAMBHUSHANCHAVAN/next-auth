import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
