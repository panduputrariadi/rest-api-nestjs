import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  UNAVAILABLE = 'UNAVAILABLE',
}

export class createBookDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @ArrayNotEmpty()
  genreIds: string[];

  @IsEnum(BookStatus)
  @IsNotEmpty()
  status: BookStatus;

  @IsString()
  @IsNotEmpty()
  language: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  totalPages: number;

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

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  publishedDate: string;

  @IsNotEmpty()
  cover: string;
}

export class updateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  price?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsUUID()
  @IsOptional()
  authorId?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsArray()
  @IsOptional()
  genreIds?: string[];

  @IsEnum(BookStatus)
  @IsOptional()
  status?: BookStatus;

  @IsString()
  @IsOptional()
  language?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  totalPages?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  weight?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  height?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  width?: number;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsString()
  @IsOptional()
  publishedDate?: string;
}
