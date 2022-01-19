import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestUser } from '../common/decorators/request-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@RequestUser() user) {
    return user;
  }
}
