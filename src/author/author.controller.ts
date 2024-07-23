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
import { AuthorService } from './author.service';
import { createAuthorDTO } from './dto/author.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllAuthor() {
    return this.authorService.findAllAuthor();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAuthorById(@Param('id') id: string) {
    return this.authorService.findAuthorById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAuthor(@Body() dto: createAuthorDTO) {
    return this.authorService.createAuthor(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateAuthor(@Param('id') id: string, @Body() dto: createAuthorDTO) {
    return this.authorService.updateAuthor(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
