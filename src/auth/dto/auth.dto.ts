import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password must be between 3 and 20 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class LoginDTO {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password must be between 3 and 20 characters' })
  password: string;
}
