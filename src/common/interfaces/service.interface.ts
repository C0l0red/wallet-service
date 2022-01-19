import { EntityDto } from './dto.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Service {}

export interface EntityService<Entity> extends Service {
  create(entityDto: EntityDto<Entity>): Promise<Entity>;

  findAll(): Promise<Entity[]>;

  findOne(id: string): Promise<Entity>;

  update(
    id: string,
    partialEntityDto: Partial<EntityDto<Entity>>,
  ): Promise<Entity>;

  remove(id: string): Promise<void>;

  failIfNotPermitted(id: string, user: Entity): void;
}
