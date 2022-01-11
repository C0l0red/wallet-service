import { Entity as EntityInterface } from "src/common/interfaces/entity.interface";

export class User implements EntityInterface {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}