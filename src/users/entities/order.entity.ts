import { UserEntity } from './user.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export class OrderEntity {
  date: Date;
  user: UserEntity;
  products: ProductEntity[];
}
