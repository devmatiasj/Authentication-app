import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OperatorsService } from 'src/operators/operators.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly secretKey = 'kenility';
  constructor(
    private operatorService: OperatorsService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.operatorService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: jwt.sign(payload, this.secretKey, { expiresIn: '1h' })
    };
  }
}