import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../products/entities/product.entity';

//Esta es una tabla ternaria creada por nosotros,
//Ya que Nest js solo nos entrega una version de tabla ternaria sin atributos adicionales
//En este caso quisimos incorporar el atributo quantity por lo que debemos crear y manejar
//la tabla ternaria nosotros mismos. Eso significa que no podremos acceder a los metodos que
//nos entrega Nest js para la tabla ternaria que el crea por defecto.
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  //Unidireccional
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  //Bidireccional por tanto tiene su contraparte en order entity
  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
