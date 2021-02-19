import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarControllers {
  constructor(private readonly carService: CarsService) {}

  @Post()
  async addCar(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.carService.addCar(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getCars() {
    return await this.carService.getCars();
  }

  @Get(':id')
  async getCar(@Param('id') carId: string) {
    return await this.carService.getCar(carId);
  }

  @Patch(':id')
  async updateTrack(
    @Param('id') carId: string,

    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.carService.updateCar(
      carId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
  @Delete(':id')
  async deleteCar(@Param('id') carId: ObjectId) {
    await this.carService.deleteCar(carId);
    return null;
  }
}
