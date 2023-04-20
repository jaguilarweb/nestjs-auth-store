import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar' })
  role: string;
}
