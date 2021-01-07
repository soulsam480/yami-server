import { OrderEntity } from './../orders/entities/order.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private Users: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private Orders: Repository<OrderEntity>,
  ) {}

  public async getByEmail(email: string) {
    const user = await this.Users.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  public async createUser(user: CreateUserDto) {
    const newUser = this.Users.create(user);
    await this.Users.save(newUser);
    return newUser;
  }
  public async updateUser(userId: string, user: UpdateUserDto) {
    const updateUser = await this.Users.update(
      { id: userId },
      {
        ...user,
      },
    );
    return updateUser;
  }
  public async sendUserData(userId: string) {
    const user = await UserEntity.findOne({ where: { id: userId } });
    const userOrders = await this.Orders.find({
      where: { user: { id: userId } },
    });
    user.password = undefined;
    return { user: user, orders: userOrders };
  }
}
