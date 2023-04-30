import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  /*   Index, */
} from 'typeorm';

import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
//La entidad debil debe tener la referencia

@Entity({ name: 'products' }) //Podemos definir el nombre de la tabla en la base de datos
/* @Index(['price', 'stock']) */
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  /*   @Index() */
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Este es quien lleva la relación
  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  @JoinTable({
    name: 'product_categories', //Nombre de la tabla
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  }) //Debe ir en un solo lado da igual cual, pero quien la lleva maneja la relación
  categories: CategoryEntity[];
}
