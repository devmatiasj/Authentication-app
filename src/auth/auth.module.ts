import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { OperatorsModule } from 'src/operators/operators.module';
import { JwtStrategy } from '../config/jwt.strategy'; 

@Module({
    imports: [
      UsersModule,
      OperatorsModule,
      JwtModule.register({
        secret: 'kenility',
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService], 
  })
  export class AuthModule {}