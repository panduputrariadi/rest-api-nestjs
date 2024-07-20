import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createAuthorDTO } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async findAllAuthor() {
    const allAuthor = await this.prisma.author.findMany({
      include: {
        books: true,
      },
    });

    if (allAuthor.length === 0) {
      throw new NotFoundException('No authors found');
    }

    return {
      message: 'All author',
      data: allAuthor,
      total: allAuthor.length,
    };
  }

  async findAuthorById(id: string) {
    const author = await this.prisma.author.findUnique({
      where: {
        id,
      },
      include: {
        books: true,
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return {
      message: 'Author found',
      data: author,
    };
  }

  async createAuthor(dto: createAuthorDTO) {
    const { name, biography } = dto;
    const newAuthor = await this.prisma.author.create({
      data: {
        name,
        biography,
      },
    });
    return {
      message: 'Author created',
      data: newAuthor,
    };
  }

  async updateAuthor(id: string, dto: createAuthorDTO) {
    const { name, biography } = dto;
    const updatedAuthor = await this.prisma.author.update({
      where: {
        id,
      },
      data: {
        name,
        biography,
      },
    });
    return {
      message: 'Author updated',
      data: updatedAuthor,
    };
  }

  async deleteAuthor(id: string) {
    const deletedAuthor = await this.prisma.author.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Author deleted',
      data: deletedAuthor,
    };
  }
}
