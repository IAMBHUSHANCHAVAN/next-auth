import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bhushanchavan:BHUSHAN2001@cluster1.ztqa1jw.mongodb.net/',
    ),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
