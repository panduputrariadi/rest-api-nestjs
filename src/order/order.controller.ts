import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { createOrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllOrder() {
    return this.orderService.findAllOrder();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOrderById(@Param('id') id: string) {
    return this.orderService.findOrderById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() dto: createOrderDTO, @Request() req) {
    const userId = req.user.id;
    return this.orderService.createOrder(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() dto: createOrderDTO,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.orderService.updateOrder(dto, userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}

@Controller('my-orders')
export class MyOrdersController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOrdersByUserId(@Request() req) {
    const userId = req.user.id;
    return this.orderService.getMyOrders(userId);
  }
}
