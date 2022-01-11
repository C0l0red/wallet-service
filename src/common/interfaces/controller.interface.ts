import { EntityDto } from './dto.interface';
import { Entity } from './entity.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Controller {}

export interface EntityController extends Controller {
  create(entityDto: EntityDto): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findOne(id: string): Promise<Entity>;
  update(id: string, partialEntityDto: Partial<EntityDto>): Promise<Entity>;
  remove(id: string): Promise<void>;
}
