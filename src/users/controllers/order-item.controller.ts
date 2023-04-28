import { Controller, Post, Get, Body } from '@nestjs/common';

import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemDto } from '../dtos/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }
}
