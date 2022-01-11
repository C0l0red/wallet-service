import { Entity as EntityInterface } from 'src/common/interfaces/entity.interface';
import { BankName } from 'src/common/enums/bank-name.enum';
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
export class Wallet implements EntityInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'wallet_id' })
  id: string;

  @Column({ name: 'foreign_id', type: 'varchar', length: 36 })
  foreignId: string;

  @Column({ name: 'bank_name', type: 'enum', enum: BankName })
  bankName: BankName;

  @Column({ name: 'account_name', type: 'varchar', length: 15 })
  accountNumber: string;

  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
