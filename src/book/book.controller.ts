import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDTO, updateBookDTO } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards()
  @Get()
  findAllBook() {
    return this.bookService.findAllBook();
  }

  @UseGuards()
  @Get(':id')
  findBookById(@Param('id') id: string) {
    return this.bookService.findBookById(id);
  }

  @UseGuards()
  @Post()
  createBook(@Body() dto: createBookDTO) {
    return this.bookService.createBook(dto);
  }

  @UseGuards()
  @Put(':id')
  updateBook(@Param('id') id: string, @Body() dto: updateBookDTO) {
    return this.bookService.updateBook(id, dto);
  }
}
