import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() user: LoginDTO) {
    return this.authService.login(user.email, user.password);
  }
}
