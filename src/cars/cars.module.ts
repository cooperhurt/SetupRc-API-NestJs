import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './car.model';
import { CarControllers } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cars', schema: CarSchema }]),
  ],
  controllers: [CarControllers],
  providers: [CarsService],
})
export class CarsModule {}
