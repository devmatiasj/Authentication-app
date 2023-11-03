import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OperatorsModule } from './operators/operators.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nombre-de-la-base-de-datos'), MulterModule.register({
    dest: './uploads',
  }), UsersModule, AuthModule, OperatorsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
