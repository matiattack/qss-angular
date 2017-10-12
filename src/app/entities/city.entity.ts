import {EntityBase, IEntityBase} from "./base/entity-base.entity";

export class CityEntity extends EntityBase<CityEntity> implements IEntityBase {

  id: number;
  name: string;
  state: string;
  country: string;

  constructor(name?: string, state?: string, country?: string){
    super();
    this.name = name;
    this.state = state;
    this.country = country;
  }

  setAttributes(input: any): void {
    this.id = input.id;
    this.name = input.nombre;
  }

  getObject(): CityEntity {
    return this;
  }
}
