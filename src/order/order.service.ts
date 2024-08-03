import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createOrderDTO, updateOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAllOrder() {
    const allOrder = await this.prisma.order.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    if (allOrder.length === 0) {
      throw new NotFoundException('No order found');
    }
    return {
      message: 'All order',
      data: allOrder,
      total: allOrder.length,
    };
  }

  async findOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        book: true,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return {
      message: 'Order found',
      data: order,
    };
  }

  async getMyOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        book: true,
      },
    });

    if (orders.length === 0) {
      throw new NotFoundException('No orders found for this user');
    }

    return {
      message: 'Orders found',
      data: orders,
      total: orders.length,
    };
  }

  async createOrder(dto: createOrderDTO, userId: string) {
    const { bookId, quantity } = dto;

    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const totalPrice = book.price * quantity;

    const order = await this.prisma.order.create({
      data: {
        bookId,
        userId,
        quantity,
        status: 'PENDING',
        totalPrice,
      },
    });
    return {
      message: 'Order created',
      data: order,
    };
  }

  async updateOrder(dto: updateOrderDTO, userId: string, id: string) {
    const { bookId, quantity } = dto;

    const findOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!findOrder) {
      throw new NotFoundException('Order not found');
    }

    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const totalPrice = book.price * quantity;

    const order = await this.prisma.order.update({
      where: { id },
      data: {
        bookId,
        userId,
        quantity,
        status: 'PENDING',
        totalPrice,
      },
    });
    return {
      message: 'Order created',
      data: order,
    };
  }

  async deleteOrder(id: string) {
    const order = await this.prisma.order.delete({
      where: { id },
    });
    return {
      message: 'Order deleted',
      data: order,
    };
  }
}
