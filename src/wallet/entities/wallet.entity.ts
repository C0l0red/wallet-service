import { Entity as EntityInterface } from "src/common/interfaces/entity.interface";

export class Wallet implements EntityInterface {
    id: string;
    foreignId: string;
    bankName: string;
    accountNumber: string;
    createdAt: Date;
    updatedAt: Date;
}