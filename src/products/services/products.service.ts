import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../entities/product.entity';
import { CreateProductDtos, UpdateProductDtos } from '../dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOneBy({ id });
    //Error first
    if (!product) {
      /* throw 'error'; */
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  /*   create(payload: CreateProductDtos): ProductEntity {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDtos): ProductEntity {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === id);
    if (index <= -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  } */
}
