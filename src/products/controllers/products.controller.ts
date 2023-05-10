import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
//import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from '../services/products.service';
import {
  CreateProductDtos,
  UpdateProductDtos,
  FilterProductDto,
} from '../dtos/product.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

//@UseGuards(AuthGuard('jwt'))
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get('queries')
  @ApiOperation({ summary: 'Lista de productos' })
  getProductsQuery(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
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
  @Public()
  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDtos) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDtos,
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryByProduct(id, categoryId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
