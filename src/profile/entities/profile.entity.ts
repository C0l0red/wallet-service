import { Entity as EntityInterface } from "src/common/interfaces/entity.interface";

export class Profile implements EntityInterface {
    id: string;
    bankAccount: string;
    currency: string;
    bvn: number;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}