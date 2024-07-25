import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createBookDTO, updateBookDTO } from './dto/book.dto';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAllBook() {
    const books = await this.prisma.book.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        Genres: {
          include: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        imageBook: true,
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
        imageBook: true,
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

  async createBook(
    dto: createBookDTO,
    images: Express.Multer.File[],
    baseUrl: string,
  ) {
    const { title, description, price, stock, authorId, categoryId, genreIds } =
      dto;

    await this.checkAuthorExists(authorId);
    await this.checkCategoryExists(categoryId);
    await this.checkGenresExist(genreIds);

    const imageRecords = images.map((file) => ({
      url: `${baseUrl}/uploads/${file.filename}`,
    }));

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
        imageBook: {
          create: imageRecords,
        },
      },
      include: {
        Genres: {
          include: {
            genre: true,
          },
        },
        imageBook: true,
        author: true,
        category: true,
      },
    });

    return {
      message: 'Book created',
      data: newBook,
    };
  }

  async updateBook(
    id: string,
    dto: updateBookDTO,
    images?: Express.Multer.File[],
    baseUrl?: string,
  ) {
    const { title, description, price, stock, authorId, categoryId, genreIds } =
      dto;

    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.checkAuthorExists(authorId);
    await this.checkCategoryExists(categoryId);
    await this.checkGenresExist(genreIds);

    const oldImages = await this.prisma.imageBook.findMany({
      where: { bookId: id },
    });

    await this.prisma.imageBook.deleteMany({
      where: { bookId: id },
    });

    oldImages.forEach((image) => {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        path.basename(image.url),
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete image file: ${filePath}`, err);
        }
      });
    });

    const imageRecords =
      images?.map((file) => ({ url: `${baseUrl}/uploads/${file.filename}` })) ||
      [];

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
        imageBook:
          imageRecords.length > 0
            ? {
                deleteMany: {},
                create: imageRecords,
              }
            : undefined,
      },
      include: {
        Genres: {
          include: {
            genre: true,
          },
        },
        imageBook: true,
      },
    });

    return {
      message: 'Book updated',
      data: updatedBook,
    };
  }

  async deleteBook(id: string) {
    const images = await this.prisma.imageBook.findMany({
      where: { bookId: id },
    });

    images.forEach((image) => {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        path.basename(image.url),
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete image file: ${filePath}`, err);
        }
      });
    });

    await this.prisma.bookGenres.deleteMany({
      where: { bookId: id },
    });

    await this.prisma.imageBook.deleteMany({
      where: { bookId: id },
    });
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
