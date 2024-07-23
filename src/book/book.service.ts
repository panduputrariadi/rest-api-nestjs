import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createBookDTO, updateBookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAllBook() {
    const books = await this.prisma.book.findMany({
      include: {
        author: true,
        category: true,
        Genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    if (books.length === 0) {
      throw new NotFoundException('No books found');
    }
    return {
      message: 'All books',
      data: books,
      total: books.length,
    };
  }

  async findBookById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
        Genres: {
          include: {
            genre: true,
          },
        },
      },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return {
      message: 'Book found',
      data: book,
    };
  }

  async createBook(dto: createBookDTO) {
    const { title, description, price, stock, authorId, categoryId, genreIds } =
      dto;

    await this.checkAuthorExists(authorId);
    await this.checkCategoryExists(categoryId);
    await this.checkGenresExist(genreIds);

    const newBook = await this.prisma.book.create({
      data: {
        title,
        description,
        price,
        stock,
        authorId,
        categoryId,
        Genres: {
          create: genreIds.map((id) => ({
            genre: { connect: { id } },
          })),
        },
      },
      include: {
        Genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return {
      message: 'Book created',
      data: newBook,
    };
  }

  async updateBook(id: string, dto: updateBookDTO) {
    const { title, description, price, stock, authorId, categoryId, genreIds } =
      dto;

    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (authorId) {
      await this.checkAuthorExists(authorId);
    }

    if (categoryId) {
      await this.checkCategoryExists(categoryId);
    }

    if (genreIds) {
      await this.checkGenresExist(genreIds);
    }

    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: {
        title,
        description,
        price,
        stock,
        authorId,
        categoryId,
        Genres: genreIds
          ? {
              deleteMany: {},
              create: genreIds.map((id) => ({
                genre: { connect: { id } },
              })),
            }
          : undefined,
      },
      include: {
        Genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return {
      message: 'Book updated',
      data: updatedBook,
    };
  }

  async deleteBook(id: string) {
    const deletedBook = await this.prisma.book.delete({
      where: { id },
    });
    return {
      message: 'Book deleted',
      data: deletedBook,
    };
  }

  private async checkAuthorExists(authorId: string) {
    const authorExists = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!authorExists) {
      throw new NotFoundException('Author not found');
    }
  }

  private async checkCategoryExists(categoryId: string) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }
  }

  private async checkGenresExist(genreIds: string[]) {
    const genres = await this.prisma.genre.findMany({
      where: { id: { in: genreIds } },
    });

    if (genres.length !== genreIds.length) {
      throw new NotFoundException('One or more genres not found');
    }
  }
}
