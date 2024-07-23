import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { createGenreDTO, updateGenreDTO } from './dto/genre.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllGenre() {
    return this.genreService.findAllGenre();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findGenreById(@Param('id') id: string) {
    return this.genreService.findGenreById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createGenre(@Body() dto: createGenreDTO) {
    return this.genreService.createGenre(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateGenre(@Param('id') id: string, @Body() dto: updateGenreDTO) {
    return this.genreService.updateGenre(id, dto);
  }
}
