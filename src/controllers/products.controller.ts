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

@Controller('products')
export class ProductsController {
  //Endpoints, todos antecedidos por http://localhost:3000/products/
  @Get()
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id') id: string) {
    return {
      message: 'Product',
      id,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Create product',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: 'Update product',
      id,
      payload,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      message: 'Delete product',
      id,
    };
  }
}
