import { EntityDto } from '../../common/interfaces/dto.interface';
import { User } from '../entities/user.entity';
import { IsAlpha, IsEmail, Matches, MinLength } from 'class-validator';

const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;

export class UserDto implements EntityDto<User> {
  id?: string;

  @IsEmail()
  email: string;

  @Matches(validPasswordRegex, {
    message:
      'Password should contain at least an uppercase and lowercase letter, a digit and a symbol',
  })
  @MinLength(8)
  password: string;

  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  isActive?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
