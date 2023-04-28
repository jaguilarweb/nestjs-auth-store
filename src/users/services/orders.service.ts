import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../entities/order.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const newOrder = new OrderEntity();
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: payload.customerId },
      });
      newOrder.customer = customer;
    }
    return this.orderRepository.save(newOrder);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: payload.customerId },
      });
      order.customer = customer;
    }
    //this.orderRepository.merge(order, payload);
    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    await this.orderRepository.delete(id);
  }
}
