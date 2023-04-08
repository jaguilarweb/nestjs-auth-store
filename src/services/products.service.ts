import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDtos, UpdateProductDtos } from '../dtos/product.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: ProductEntity[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: '',
    },
  ];

  findAll(): ProductEntity[] {
    return this.products;
  }

  findOne(id: number): ProductEntity {
    const product = this.products.find((item) => item.id === id);
    //Error first
    if (!product) {
      /* throw 'error'; */
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDtos): ProductEntity {
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
  }
}
