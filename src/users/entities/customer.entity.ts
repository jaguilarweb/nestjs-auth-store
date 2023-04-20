import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}
