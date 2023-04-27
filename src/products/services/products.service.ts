import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { ProductEntity } from '../entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';
import { BrandEntity } from '../entities/brand.entity';
import { BrandsService } from './brands.service';
import { CreateProductDtos, UpdateProductDtos } from '../dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    private brandService: BrandsService,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(BrandEntity)
    private brandRepo: Repository<BrandEntity>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    //Error first
    if (!product) {
      /* throw 'error'; */
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDtos) {
    //El método 'create' en esta caso solo crea una instancia
    const newProduct = this.productRepo.create(payload);
    if (!newProduct) {
      throw new NotFoundException('Product not created');
    }
    if (payload.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: payload.brandId });
      newProduct.brand = brand;
    }
    if (payload.categoriesId) {
      const categories = await this.categoryRepo.findBy({
        id: In(payload.categoriesId),
      });
      newProduct.categories = categories;
    }
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
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (payload.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: payload.brandId });
      product.brand = brand;
    }
    //Merge sobreescribe los datos sobre el producto
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    //POdemos agregar una validación
    return this.productRepo.delete(id);
  }
}
