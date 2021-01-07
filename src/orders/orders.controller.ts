import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // @Get()
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  @Get(':id')
  findOneByUser(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { userId } = request;
    return this.ordersService.findOneByUser(id, userId);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
