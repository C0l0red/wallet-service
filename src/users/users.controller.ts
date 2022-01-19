import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EntityController } from '../common/interfaces/controller.interface';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController implements EntityController<User> {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) userDto: UserDto,
  ): Promise<User> {
    return this.userService.create(userDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param(ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    partialUserDto: Partial<UserDto>,
  ): Promise<User> {
    return this.userService.update(id, partialUserDto);
  }

  @Delete(':id')
  remove(@Param(ValidationPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
