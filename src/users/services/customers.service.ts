import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: CustomerEntity[] = [
    {
      id: 1,
      name: 'Maria',
      lastName: 'Molina',
      phone: '555111212',
    },
  ];

  findAll(): CustomerEntity[] {
    return this.customers;
  }

  findOne(id: number): CustomerEntity {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto): CustomerEntity {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto): CustomerEntity {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: number): boolean {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
