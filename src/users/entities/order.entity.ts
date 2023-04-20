import { Column, Entity } from 'typeorm';

import { UserEntity } from './user.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity()
export class OrderEntity {
  @Column({ type: 'varchar' })
  date: Date;
  @Column()
  user: UserEntity;
  @Column()
  products: ProductEntity[];
}
