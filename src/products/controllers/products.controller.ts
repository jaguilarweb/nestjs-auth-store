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
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDtos, UpdateProductDtos } from '../dtos/product.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Endpoints, todos antecedidos por http://localhost:3000/products/
  //El manejo de HttpsCode y Status es opcional según el proyecto.
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productsService.findAll();
  }

  @Get('queries')
  @ApiOperation({ summary: 'List of products paginada' })
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
  //Estamos recibiendo parametros en forma de string,
  //por lo que usamos un pipe para transformar la id en número.
  //Y luego puedo cambiar el tipeo de id: string por id:number.
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  /*   @Post()
  create(@Body() payload: CreateProductDtos) {
    return this.productsService.create(payload);
  } */

  /*   @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDtos,
  ) {
    return this.productsService.update(id, payload);
  } */

  /*   @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  } */
}
