import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthDTO, LoginDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './utils/constant';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(dto: AuthDTO) {
    const { email, password, role, name } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashingPassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data: { email, role, name, password: hashingPassword },
    });
    return {
      HttpStatus: HttpStatus.CREATED,
      message: 'register success',
    };
  }

  async login(dto: LoginDTO, req: Request, res: Response) {
    const { email, password } = dto;
    const findUser = await this.prisma.user.findUnique({ where: { email } });
    if (!findUser) {
      throw new BadRequestException('User with this email not found');
    }

    const isMatch = await this.comparePassword({
      password,
      hash: findUser.password,
    });
    if (!isMatch) {
      throw new BadRequestException('Password is not correct');
    }

    const tokenJWT = await this.loginTokens({
      id: findUser.id,
      email: findUser.email,
    });

    if (!tokenJWT) {
      throw new ForbiddenException('Login failed');
    }

    res.cookie('token', tokenJWT, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ message: 'login success' });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'logout success' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async loginTokens(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
