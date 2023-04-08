import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Endpoints, todos antecedidos por http://localhost:3000/products/
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.findAll();
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
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
