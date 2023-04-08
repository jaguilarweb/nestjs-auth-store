import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  // Endpoints
  @Get()
  getAll() {
    return {
      message: 'Categorias',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: 'Categoria',
      id,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Categoria creada',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: 'Categoria actualizada',
      id,
      payload,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      message: 'Categoria eliminada',
      id,
    };
  }
}
