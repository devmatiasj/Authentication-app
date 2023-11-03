import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operators } from './interfaces/operator.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OperatorsService {
  constructor(@InjectModel('Operators') private readonly operatorModel: Model<Operators>) {}

  async createOperator(username: string, unencriptedPassword: string): Promise<Operators> {
    const operator = await this.operatorModel.findOne({ username }).exec();
    if(operator){
      throw new ConflictException(`The username'${username}' is already registered.`);
    }
    const saltRounds = 10;
    const password = await bcrypt.hash(unencriptedPassword, saltRounds);
    const createdOperator = new this.operatorModel({ username, password });
    return createdOperator.save();
  }

  async findByUsername(username: string): Promise<Operators>{
    const operator = await this.operatorModel.findOne({ username }).exec();
    if (!operator) {
      throw new NotFoundException('Operator not found.');
    }
    return operator;
  }

}