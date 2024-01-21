import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bhushanchavan:BHUSHAN2001@cluster1.ztqa1jw.mongodb.net/',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
