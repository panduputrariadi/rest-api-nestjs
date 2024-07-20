import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAllCategory() {
    const allCategory = await this.prisma.category.findMany({
      include: {
        books: true,
      },
    });

    if (allCategory.length === 0) {
      throw new NotFoundException('No categories found');
    }

    return {
      message: 'All category',
      data: allCategory,
      total: allCategory.length,
    };
  }

  async findCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        books: true,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return {
      message: 'Category found',
      data: category,
    };
  }

  async createCategory(dto: createCategoryDTO) {
    const { name } = dto;
    const newCategory = await this.prisma.category.create({
      data: {
        name,
      },
    });
    return {
      message: 'Category created',
      data: newCategory,
    };
  }

  async updateCategory(id: string, dto: createCategoryDTO) {
    const { name } = dto;
    const updatedCategory = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return {
      message: 'Category updated',
      data: updatedCategory,
    };
  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.prisma.category.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Category deleted',
      data: deletedCategory,
    };
  }
}
