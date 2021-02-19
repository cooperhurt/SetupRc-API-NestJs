import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track } from './track.model';
@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @InjectModel('Tracks') private readonly trackModel: Model<Track>,
  ) {}

  async addTrack(title: string, desc: string, price: number) {
    const newProduct = new this.trackModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getTracks() {
    const setups = await this.trackModel
      .find()
      .lean()
      .exec();
    return setups;
  }

  async getTrack(id: string) {
    const setup = await this.findTrack(id);
    return setup;
  }

  async updateTrack(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findTrack(productId);
    // updatedProduct.title = title || updatedProduct.title;
    // updatedProduct.description = desc || updatedProduct.description;
    // updatedProduct.price = price || updatedProduct.price;
    updatedProduct.save();
  }

  async deleteTrack(setupId: ObjectId) {
    const result = await this.trackModel
      .findByIdAndUpdate({ _id: setupId }, { Active: false })
      .lean()
      .exec();
    if (!result) {
      throw new NotFoundException('Could not find product');
    }
  }

  private async findTrack(id: string): Promise<Track> {
    // findOne() can be used also
    let product;
    try {
      product = await this.trackModel.find({ _id: id, Active: true });
    } catch (error) {
      throw new NotFoundException('Could not find track');
    }
    if (!product) {
      throw new NotFoundException('Could not find track');
    }
    return product;
  }
}
