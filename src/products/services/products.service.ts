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

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    //Error first
    if (!product) {
      /* throw 'error'; */
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDtos) {
    //El método 'create' en esta caso solo crea una instancia
    const newProduct = this.productRepo.create(payload);
    //El método 'save' guarda en la base de datos
    return this.productRepo.save(newProduct);
  }

  //Esta es una forma valida pero poco efectiva
  /*   create(payload: CreateProductDtos) {
    const newProduct = new ProductEntity();
    newProduct.name = payload.name;
    newProduct.price = payload.price;
    newProduct.description = payload.description;
    newProduct.image = payload.image;
    newProduct.stock = payload.stock;
    return this.productRepo.save(newProduct);
  } */

  async update(id: number, payload: UpdateProductDtos) {
    const product = await this.productRepo.findOneBy({ id });
    //Merge sobreescribe los datos sobre el producto
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    //POdemos agregar una validación
    return this.productRepo.delete(id);
  }
}
