import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);
    return await this.customerRepo.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customerRepo.merge(customer, payload);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    const customer = this.customerRepo.findOneBy({});
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customerRepo.delete(id);
  }
}
