import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../shared/parse-int.pipe';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // Endpoints
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
