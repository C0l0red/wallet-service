import { Injectable } from '@nestjs/common';
import { EntityService } from '../common/interfaces/service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

@Injectable()
export class UsersService implements EntityService<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const user: User = this.userRepository.create(userDto);
    await UsersService.hashPassword(user);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ id }).catch(() => {
      throw new Error('User not found');
    });
  }

  async update(id: string, partialUserDto: Partial<UserDto>): Promise<User> {
    const user: User = await this.findOne(id);
    return this.userRepository.merge(user, partialUserDto);
  }

  async remove(id: string): Promise<void> {
    const user: User = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async findByEmail(email: string) {
    if (!isEmail(email)) throw new Error('Invalid email');

    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();
  }

  failIfNotPermitted(entryId: string, user: User) {
    if (entryId !== user.id) {
      throw new Error('Does not have permission');
    }
  }

  private static async hashPassword(user: User) {
    const rounds = 10;
    user.password = await bcrypt.hash(user.password, rounds);
  }

  async verifyPassword(user: User, plainPassword: string) {
    return await bcrypt.compare(plainPassword, user.password);
  }
}
