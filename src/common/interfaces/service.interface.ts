import { EntityDto } from './dto.interface';
import { Entity } from './entity.interface';

export interface Service {}

export interface EntityService extends Service {
  create(entityDto: EntityDto): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findOne(id: string): Promise<Entity>;
  update(id: string, partialEntityDto: Partial<EntityDto>): Promise<Entity>;
  remove(id: string): Promise<void>;
  failIfNotPermitted(id: string, user: Entity): void;
}
