import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MyOrdersController, OrderController } from './order.controller';

@Module({
  controllers: [OrderController, MyOrdersController],
  providers: [OrderService],
})
export class OrderModule {}
