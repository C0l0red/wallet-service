import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findByEmail(email);
    const passwordIsValid = () =>
      this.userService.verifyPassword(user, password);

    if (user && (await passwordIsValid())) {
      return user;
    }

    throw new UnauthorizedException('Invalid User Credentials');
  }
}
