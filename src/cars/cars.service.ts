import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Car } from './car.model';
@Injectable()
export class CarsService {
  private cars: Car[] = [];

  constructor(
    @InjectModel('Cars') private readonly carModel: Model<Car>,
  ) {}

  async addCar(title: string, desc: string, price: number) {
    const newCar = new this.carModel({
      title,
      description: desc,
      price,
    });
    const result = await newCar.save();
    return result.id as string;
  }

  async getCars() {
    const cars = await this.carModel
      .find()
      .lean()
      .exec();
    return cars;
  }

  async getCar(id: string) {
    const car = await this.findCar(id);
    return car;
  }

  async updateCar(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const car = await this.findCar(productId);
    car.save();
  }

  async deleteCar(setupId: ObjectId) {
    const car = await this.carModel
      .findByIdAndUpdate({ _id: setupId }, { Active: false })
      .lean()
      .exec();
    if (!car) {
      throw new NotFoundException('Could not find product');
    }
  }

  private async findCar(id: string): Promise<Car> {
    // findOne() can be used also
    let product;
    try {
      product = await this.carModel.find({ _id: id, Active: true });
    } catch (error) {
      throw new NotFoundException('Could not find car');
    }
    if (!product) {
      throw new NotFoundException('Could not find car');
    }
    return product;
  }
}
