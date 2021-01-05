import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  name: string;

  @Column('integer', { nullable: false, unique: false })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  shortDesc: string;

  @Column('text', { nullable: false })
  status: string;

  @Column('text', { nullable: true })
  notes: string;

  @Column('text', { nullable: false, array: true })
  images: string[];

  @Column('text', { nullable: false, array: true })
  colors: string[];

  @Column('text', { nullable: false, array: true })
  sizes: string[];

  @Column('text', { nullable: false, array: true })
  categories: string[];

  @Column('text', { nullable: true, array: true })
  tags: string[];

  @Column({ type: 'timestamp', default: () => `now()` })
  stamp;
}
