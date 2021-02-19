import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Setup } from './setup.model';
@Injectable()
export class SetupsService {
  private setups: Setup[] = [];

  constructor(
    @InjectModel('Setups') private readonly setupModel: Model<Setup>,
  ) {}

  async addSetup(title: string, desc: string, price: number) {
    const newProduct = new this.setupModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getSetups() {
    const setups = await this.setupModel
      .find()
      .lean()
      .exec();
    return setups;
  }

  async getSetup(id: string) {
    const setup = await this.findSetup(id);
    return setup;
  }

  async updateSetup(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findSetup(productId);
    // updatedProduct.title = title || updatedProduct.title;
    // updatedProduct.description = desc || updatedProduct.description;
    // updatedProduct.price = price || updatedProduct.price;
    updatedProduct.save();
  }

  async deleteSetup(setupId: ObjectId) {
    const result = await this.setupModel
      .findByIdAndUpdate({ _id: setupId }, { Active: false })
      .lean()
      .exec();
    if (!result) {
      throw new NotFoundException('Could not find setup');
    }
  }

  private async findSetup(id: string): Promise<Setup> {
    // findOne() can be used also
    let setup;
    console.log(id,"id is")
    try {
      setup = await this.setupModel.find({ Active: true });
    } catch (error) {
      console.log(error,"error is")
      throw new NotFoundException('Error finding the setup');
    }
    if (!setup) {
      throw new NotFoundException('Could not find setup');
    }
    return setup;
  }
}
