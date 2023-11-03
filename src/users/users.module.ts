import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { FileMiddleware } from 'src/middlewares/file.validator';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]), 
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})

export class UsersModule {
  configure(consumer) {
  consumer.apply(FileMiddleware).forRoutes('users');
}}