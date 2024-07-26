import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsDateString,
} from 'class-validator';

export class createBookDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @ArrayNotEmpty()
  genreIds: string[];

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  totalPages: number;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsDateString()
  @IsNotEmpty()
  publishedAt: string;

  @IsString()
  @IsNotEmpty()
  language: string;
}

export class updateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  price?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsArray()
  @IsOptional()
  genreIds: string[];

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  weight: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  height: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  width: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  totalPages: number;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsDateString()
  @IsOptional()
  publishedAt: string;

  @IsString()
  @IsOptional()
  language: string;
}
