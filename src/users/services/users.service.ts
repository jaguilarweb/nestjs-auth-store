import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users = [
    {
      id: 1,
      name: 'User 1',
      email: '',
      password: '',
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

  create(payload: any): UserEntity {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: any) {
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
}
