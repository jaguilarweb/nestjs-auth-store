import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  //Endpoints, todos antecedidos por http://localhost:3000/products/
  @Get()
  getProducts() {
    return {
      message: 'All products',
    };
  }

  @Get('queries')
  getProductsQuery(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `All products, limit: ${limit}, offset ${offset} and brand ${brand}`,
    };
  }

  @Get('filters')
  getProductsFilter() {
    return {
      message: 'Filters products',
    };
  }
  //Rutas dinámicas van después de las rutas fijas
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return {
      message: 'Product',
      id,
    };
  }
}
