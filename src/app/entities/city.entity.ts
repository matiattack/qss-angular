import {EntityBase, IEntityBase} from "./base/entity-base.entity";

export class CityEntity extends EntityBase<CityEntity> implements IEntityBase {

  private _id: number;
  private _name: string;

  setAttributes(input: any): void {

    this._id = input.id;
    this._name = input.nombre;

  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  getObject(): CityEntity {
    return this;
  }
}
