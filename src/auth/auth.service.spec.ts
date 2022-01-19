import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { mockUsersService, mockCredentials, mockUser } from '../common/mocks';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const { email, password } = mockCredentials;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call UsersService.findByEmail with correct email', async () => {
      await service.validateUser(email, password);

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should call UsersService.verifyPassword with user and password', async () => {
      await service.validateUser(email, password);

      expect(usersService.verifyPassword).toHaveBeenCalledWith(
        mockUser,
        password,
      );
    });

    it('should return a User', async () => {
      await expect(service.validateUser(email, password)).resolves.toEqual(
        mockUser,
      );
    });
  });
});
