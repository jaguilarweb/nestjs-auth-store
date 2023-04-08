import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts() {
    return {
      message: 'All products',
    };
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return {
      message: 'Product',
      id,
    };
  }
}
