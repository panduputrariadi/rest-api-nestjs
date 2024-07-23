import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDTO, updateBookDTO } from './dto/book.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Body() dto: createBookDTO) {
    return this.bookService.createBook(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateBook(@Param('id') id: string, @Body() dto: updateBookDTO) {
    return this.bookService.updateBook(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
