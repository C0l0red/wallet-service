import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

export const mockCredentials = {
  email: 'test@test.com',
  password: 'Star5454!!',
};

export const mockUser: User = {
  ...mockCredentials,
} as unknown as User;

export const mockAuthService: AuthService = {
  validateUser: jest.fn().mockResolvedValue(mockUser),
} as unknown as AuthService;

export const mockUsersService: UsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByEmail: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn(),
  remove: jest.fn(),
  verifyPassword: jest.fn().mockResolvedValue(true),
  failIfNotPermitted: jest.fn(),
} as unknown as UsersService;
