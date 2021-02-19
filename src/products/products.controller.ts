import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
  ) {
    const generatedId = await this.productsService.addProduct(prodTitle, prodDesc, prodPrice);    
    return { id: generatedId }
  }

  @Get()
  async getProducts() {
    const products = await this.productsService.getProducts();    
    return { products };
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productsService.getProduct(prodId);
    return { product };
  }

  @Patch(':id')
  async upadateProduct(
    @Param('id') prodId: string,

    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }
  @Delete(':id')
  async deleteProduct(
    @Param('id') prodId: string,
  ) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
