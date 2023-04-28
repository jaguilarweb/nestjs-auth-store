import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  lastName: string;
  @Column({ type: 'varchar' })
  phone: string;
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

  //Relación bidireccional
  //Especificamos quien tiene la referencia
  @OneToOne(() => UserEntity, (user) => user.customer, { nullable: true })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}
