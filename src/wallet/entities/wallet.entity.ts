import { Entity as EntityInterface } from "src/common/interfaces/entity.interface";
import { BankName } from "src/common/types/bank-name.enum";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Wallet implements EntityInterface {
    @PrimaryGeneratedColumn('uuid', {name: 'wallet_id'})
    id: string;

    @Column({name: 'foreign_id', type: 'varchar', length: 36})
    foreignId: string;

    @Column({name: 'bank_name', type: 'enum', enum: BankName})
    bankName: BankName;

    @Column({name: 'account_name', type: 'varchar', length: 15})
    accountNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}