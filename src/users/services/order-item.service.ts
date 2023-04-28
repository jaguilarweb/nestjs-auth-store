import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  findAll() {
    return this.orderItemRepository.find();
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productRepository.findOne({
      where: { id: data.productId },
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.orderItemRepository.save(item);
  }
}
