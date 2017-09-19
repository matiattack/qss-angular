import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {CityEntity} from "./city.entity";

export class StreetEntity extends EntityBase<StreetEntity> implements IEntityBase{

  private _id: number;
  private _name: string;
  private _number: string;
  private _latitude: string;
  private _longitude: string;
  private _city: CityEntity;

  constructor(name?: string, number?: string, latitude?: string, longitude?: string){
    super();
    this._name = name;
    this._number = number;
    this._latitude = latitude;
    this._longitude = longitude;
  }

  setAttributes(input: any): void {
    this._id = input.id;
    this._name = input.nombre;
    this._number = input.numero;
    this._latitude = input.latitud;
    this._longitude = input.longitud;
    if(input.hasOwnProperty('ciudad') && input.ciudad != null){
      this._city = new CityEntity().parse(input.ciudad);
    }
  }

  getObject(): StreetEntity {
    return this;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get number(): string {
    return this._number;
  }

  get latitude(): string {
    return this._latitude;
  }

  get longitude(): string {
    return this._longitude;
  }

  get city(): CityEntity {
    return this._city;
  }

}
