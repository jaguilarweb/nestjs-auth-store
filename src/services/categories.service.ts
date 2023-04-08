import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: CategoryEntity[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    },
  ];

  findAll(): CategoryEntity[] {
    return this.categories;
  }

  findOne(id: number): CategoryEntity {
    const category = this.categories.find((item) => item.id === id);
    return category;
  }

  create(payload: any): CategoryEntity {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: any) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }

  delete(id: number): boolean {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index <= -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
