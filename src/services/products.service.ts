import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
  ];
}
