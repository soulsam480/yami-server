import { ProductInCart } from './../interfaces/cart.orders';
import { UserEntity } from './../../user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { nullable: false })
  amount: number;

  @Column('text', { nullable: false })
  pay_mode: string;

  @Column('text', { nullable: false })
  status: string;

  @Column({ type: 'timestamp', default: () => `now()` })
  stamp;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  cart: ProductInCart[];

  @Column('text', { nullable: false })
  address: string;
}
