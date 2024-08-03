import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createOrderDTO {
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class updateOrderDTO {
  @IsOptional()
  @IsString()
  bookId: string;

  @IsOptional()
  @IsNumber()
  quantity: number;
}
