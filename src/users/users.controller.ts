import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findUserById(@Param() param: { id: string }) {
    return this.usersService.findUserById(param.id);
  }
}
