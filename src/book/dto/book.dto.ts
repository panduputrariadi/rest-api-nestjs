import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createBookDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

export class updateBookDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsNumber()
  readonly stock?: number;

  @IsOptional()
  @IsString()
  readonly authorId?: string;

  @IsOptional()
  @IsString()
  readonly categoryId?: string;
}
