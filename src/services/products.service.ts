import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';

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

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(Payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...Payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index > -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}
