import { Entity as EntityInterface } from 'src/common/interfaces/entity.interface';
import { Currency } from 'src/common/enums/currency.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile implements EntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  bankAccount: string;

  @Column({ type: 'enum', enum: Currency, default: Currency.NGN })
  currency: Currency;

  @Column({ type: 'integer' })
  bvn: number;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
