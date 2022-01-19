import { LocalStrategy } from './local.strategy';
import { mockAuthService, mockCredentials, mockUser } from '../../common/mocks';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

  const { email, password } = mockCredentials;

  beforeEach(() => {
    strategy = new LocalStrategy(mockAuthService);
  });

  describe('validate', () => {
    it('calls AuthService.validateUser with email and password', async () => {
      await strategy.validate(email, password);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith(
        email,
        password,
      );
    });

    it('returns the correct User object', async () => {
      await expect(strategy.validate(email, password)).resolves.toEqual(
        mockUser,
      );
    });
  });
});
