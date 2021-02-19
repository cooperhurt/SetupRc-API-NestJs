import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

    }

    async addProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title, description: desc, price });
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({ id: prod.id, title: prod.title, description: prod.description, price: prod.price })) as Product[];
    }

    async getProduct(id: string) {
        const product = await this.findProduct(id);
        return { id: product.id, description: product.description, title: product.title, price: product.price };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        updatedProduct.title = title || updatedProduct.title;
        updatedProduct.description = desc || updatedProduct.description;
        updatedProduct.price = price || updatedProduct.price;
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({ _id: productId }).exec();
        if (!result.n) {
            throw new NotFoundException('Could not find product');
        }
    }

    private async findProduct(id: string): Promise<Product> {
        // findOne() can be used also
        let product;
        try {
            product = await this.productModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return product;
    }
}
