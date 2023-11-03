import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { JwtAuthGuard } from 'src/middlewares/jwt-auth.guard';

@Controller('api/operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOperator(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.operatorsService.createOperator(username, password);
  }
}