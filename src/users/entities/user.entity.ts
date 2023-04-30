import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password: string; //Encrypt
  @Column({ type: 'varchar', length: 100 })
  role: string;
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

  @OneToOne(() => CustomerEntity, (customer) => customer.user, {
    nullable: true,
  })
  //Este carga con la relación (no se debe duplicar)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}
