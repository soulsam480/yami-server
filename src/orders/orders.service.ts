import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private Orders: Repository<OrderEntity>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const newOrder = this.Orders.create(createOrderDto);
    await newOrder.save();
    return newOrder;
  }
  // findAll() {
  //   const orders = this.Orders.find()
  // }
  async findOneByUser(id: string, userId: string) {
    const order = await this.Orders.findOne({
      where: { id: id, user: { id: userId } },
    });
    return order;
  }
  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
