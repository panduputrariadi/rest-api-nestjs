import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class createBookDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

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
}

export class updateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

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
  genreIds: string[];
}
