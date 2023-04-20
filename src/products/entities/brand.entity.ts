import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  image: string;
}
