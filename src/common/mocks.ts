import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user.dto';

export const mockCredentials = {
  email: 'test@test.com',
  password: 'Star5454!!',
};

export const mockUserDto: UserDto = {
  ...mockCredentials,
  firstName: 'Test',
  lastName: 'User',
};

export const mockUser: User = {
  ...mockUserDto,
} as unknown as User;

export const mockAuthService: AuthService = {
  validateUser: jest.fn().mockResolvedValue(mockUser),
} as unknown as AuthService;

export const mockUsersService: UsersService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  findByEmail: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockImplementation(() => Promise.resolve()),
  verifyPassword: jest.fn().mockResolvedValue(true),
  failIfNotPermitted: jest.fn(),
} as unknown as UsersService;
