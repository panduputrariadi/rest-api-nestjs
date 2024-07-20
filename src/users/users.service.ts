import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUser() {
    const allUser = await this.prisma.user.findMany();

    return {
      message: 'All user',
      data: allUser,
      total: allUser.length,
    };
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return {
      message: 'User found',
      data: user,
    };
  }
}
