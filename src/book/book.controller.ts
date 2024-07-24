import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDTO, updateBookDTO } from './dto/book.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllBook() {
    return this.bookService.findAllBook();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findBookById(@Param('id') id: string) {
    return this.bookService.findBookById(id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async createBook(
    @Body() dto: createBookDTO,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req: Request,
  ) {
    if (!images || images.length === 0) {
      throw new BadRequestException('At least one image is required');
    }
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return this.bookService.createBook(dto, images, baseUrl);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async updateBook(
    @Param('id') id: string,
    @Body() dto: updateBookDTO,
    @Req() req: Request,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return this.bookService.updateBook(id, dto, images, baseUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
