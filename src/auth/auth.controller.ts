import { Body, Controller, Post, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDTO) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDTO, @Req() req, @Res() res) {
    return this.authService.login(dto, req, res);
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }
}
