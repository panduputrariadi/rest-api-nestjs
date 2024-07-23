import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createGenreDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class updateGenreDTO {
  @IsString()
  @IsOptional()
  name: string;
}
