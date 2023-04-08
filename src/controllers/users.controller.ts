import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  // Endpoints
  @Get()
  getAll() {
    return {
      message: 'Todos los Usuarios',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: 'Usuario',
      id,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Usuario creado',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: 'Usuario actualizado',
      id,
      payload,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      message: 'Usuario eliminado',
      id,
    };
  }
}
