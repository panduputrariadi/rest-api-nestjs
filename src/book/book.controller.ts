import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDTO, updateBookDTO } from './dto/book.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async createBook(
    @Body() createBookDto: createBookDTO,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new NotFoundException('Cover image is required');
    }
    const coverUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    return this.bookService.createBook(createBookDto, coverUrl);
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
