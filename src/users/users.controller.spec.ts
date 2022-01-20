import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { mockUser, mockUserDto, mockUsersService } from '../common/mocks';
import { randomUUID } from 'crypto';

describe('UserController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call UsersService.create once', async () => {
      await controller.create(mockUserDto);

      expect(usersService.create).toHaveBeenCalledWith(mockUserDto);
    });

    it('should resolve to a User', async () => {
      await expect(controller.create(mockUserDto)).resolves.toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should call UsersService.findAll once', async () => {
      await controller.findAll();

      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should resolve to an array of Users', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should call UsersService.findOne with an id', async () => {
      const id = randomUUID();
      await controller.findOne(id);

      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });

    it('should resolve to a User', async () => {
      await expect(controller.findOne(randomUUID())).resolves.toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should call UsersService.update with an id and userDto', async () => {
      const id = randomUUID();
      await controller.update(id, mockUserDto);

      expect(usersService.update).toHaveBeenCalledWith(id, mockUserDto);
    });

    it('should resolve to a User', async () => {
      await expect(
        controller.update(randomUUID(), mockUserDto),
      ).resolves.toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should call UsersService.remove with an id', async () => {
      const id = randomUUID();
      await controller.remove(id);

      expect(usersService.remove).toHaveBeenCalledWith(id);
    });

    it('should resolve to a User', async () => {
      await expect(controller.remove(randomUUID())).resolves.toEqual(undefined);
    });
  });
});
