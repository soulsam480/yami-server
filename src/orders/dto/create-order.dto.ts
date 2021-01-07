import { UserEntity } from './../../user/entity/user.entity';
import { ProductInCart } from './../interfaces/cart.orders';
export class CreateOrderDto {
  amount: number;
  pay_mode: string;
  status: string;
  user: UserEntity;
  cart: ProductInCart[];
  address: string;
}
