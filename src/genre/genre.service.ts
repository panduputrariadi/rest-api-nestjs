import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createGenreDTO, updateGenreDTO } from './dto/genre.dto';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async findAllGenre() {
    const allGenre = await this.prisma.genre.findMany({
      include: {
        Book: {
          include: {
            book: true,
          },
        },
      },
    });

    if (allGenre.length === 0) {
      throw new NotFoundException('No genre found');
    }
    return {
      message: 'All genre',
      data: allGenre,
      total: allGenre.length,
    };
  }

  async findGenreById(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: {
        id,
      },
      include: {
        Book: {
          include: {
            book: true,
          },
        },
      },
    });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return {
      message: 'Genre found',
      data: genre,
    };
  }

  async createGenre(dto: createGenreDTO) {
    const { name } = dto;
    const existingGenre = await this.prisma.genre.findUnique({
      where: { name },
    });

    if (existingGenre) {
      throw new ConflictException('Genre with this name already exists');
    }
    const newGenre = await this.prisma.genre.create({
      data: {
        name,
      },
    });

    return {
      message: 'Genre created',
      data: newGenre,
    };
  }

  async updateGenre(id: string, dto: updateGenreDTO) {
    const { name } = dto;
    const existingGenre = await this.prisma.genre.findUnique({
      where: { name },
    });

    if (existingGenre) {
      throw new ConflictException('Genre with this name already exists');
    }

    const foundGenre = await this.prisma.genre.findUnique({
      where: {
        id,
      },
    });
    if (!foundGenre) {
      throw new NotFoundException('Genre not found');
    }

    const updatedGenre = await this.prisma.genre.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return {
      message: 'Genre updated',
      data: updatedGenre,
    };
  }

  async deleteGenre(id: string) {
    const foundGenre = await this.prisma.genre.findUnique({
      where: {
        id,
      },
    });
    if (!foundGenre) {
      throw new NotFoundException('Genre not found');
    }
    const deletedGenre = await this.prisma.genre.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Genre deleted',
      data: deletedGenre,
    };
  }
}
