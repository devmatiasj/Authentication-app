import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorsController } from './operators.controller';
import { OperatorsService } from './operators.service';
import { OperatorsSchema } from './schemas/operator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Operators', schema: OperatorsSchema }])
  ],
  controllers: [OperatorsController],
  providers: [OperatorsService],
  exports: [OperatorsService],
})
export class OperatorsModule {}