import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductEntity } from './entities/product.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoryEntity } from './entities/category.entity';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { BrandEntity } from './entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, BrandEntity]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
