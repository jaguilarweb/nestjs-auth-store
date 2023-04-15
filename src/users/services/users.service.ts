import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { OrderEntity } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('API_KEY') private apiKey: string,
  ) {}

  private counterId = 1;
  private users: UserEntity[] = [
    {
      id: 1,
      email: 'correo@gmail.com',
      password: '15252',
      role: 'admin',
    },
  ];

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: number): UserEntity {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto): UserEntity {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto): UserEntity {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  delete(id: number): boolean {
    const index = this.users.findIndex((item) => item.id === id);
    if (index <= -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrdersByUser(id: number): OrderEntity {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
