import { IsNotEmpty, IsString } from 'class-validator';

export class createAuthorDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  biography: string;
}
