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
import { CategoryService } from './category.service';
import { createCategoryDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards()
  @Get()
  findAllCategory() {
    return this.categoryService.findAllCategory();
  }

  @UseGuards()
  @Get(':id')
  findCategoryById(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }

  @UseGuards()
  @Post()
  createCategory(@Body() dto: createCategoryDTO) {
    return this.categoryService.createCategory(dto);
  }

  @UseGuards()
  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() dto: createCategoryDTO) {
    return this.categoryService.updateCategory(id, dto);
  }

  @UseGuards()
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
