import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {DisciplineEntity} from "./discipline.entity";

export class CategoryEntity extends EntityBase<CategoryEntity> implements IEntityBase{

  private _id: number;
  private _name: string;
  private _registry: string;
  private _modification: string;
  private _disciplines: DisciplineEntity[];

  setAttributes(input: any): void {
    this._id = input.id;
    this._name = input.nombre;
    this._registry = input.registry;
    this._modification = input.modify;

    if(input.hasOwnProperty('disciplinas') && input.disciplinas != null){
      let disciplines = EntityBase.parseArray(DisciplineEntity, input.disciplinas);
      this._disciplines = disciplines;
    }else{
      this._disciplines = [];
    }
  }

  get disciplines(): DisciplineEntity[] {
    return this._disciplines;
  }

  getObject(): CategoryEntity {
    return this;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get registry(): string {
    return this._registry;
  }

  get modification(): string {
    return this._modification;
  }
}
