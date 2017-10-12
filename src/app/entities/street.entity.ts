import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {CityEntity} from "./city.entity";

export class StreetEntity extends EntityBase<StreetEntity> implements IEntityBase{

  id: number;
  name: string;
  number: string;
  latitude: string;
  longitude: string;
  city: CityEntity;

  constructor(name?: string, number?: string, latitude?: string, longitude?: string){
    super();
    this.name = name;
    this.number = number;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  setAttributes(input: any): void {
    this.id = input.id;
    this.name = input.nombre;
    this.number = input.numero;
    this.latitude = input.latitud;
    this.longitude = input.longitud;
    if(input.hasOwnProperty('ciudad') && input.ciudad != null){
      this.city = new CityEntity().parse(input.ciudad);
    }
  }

  getObject(): StreetEntity {
    return this;
  }

}
