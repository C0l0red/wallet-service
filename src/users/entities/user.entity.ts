import { Entity as EntityInterface } from "src/common/interfaces/entity.interface";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class User implements EntityInterface {
    @PrimaryGeneratedColumn('uuid', {name: 'profile_id'})
    id: string;

    @Column({type: 'varchar', length: 120})
    email: string;

    @Column({type: 'varchar', length: 80, select: false})
    password: string;

    @Column({name: 'first_name', type: 'varchar', length: 50})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar', length: 50})
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}