import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { BrandEntity } from './brand.entity';
//La entidad debil debe tener la referencia

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  image: string;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand: BrandEntity;
}
