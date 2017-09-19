import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {UserEntity} from "./user.entity";

export class ScheduleEntity extends EntityBase<ScheduleEntity> implements IEntityBase{

  private _id: number;
  private _day: number;
  private _start: string;
  private _end: string;
  private _user: UserEntity;
  private _registry: string;
  private _modify: string;

  constructor(day?: number, start?: string, end?: string) {
    super();
    this._day = day;
    this._start = start;
    this._end = end;

  }

  setAttributes(json: any){

    this._id = json.id;
    this._day = json.dia;
    this._start = json.inicio;
    this._end = json.termino;
    this._registry = json.registro;
    this._modify = json.modificacion;

    if(json.hasOwnProperty('usuario')){
      let user: UserEntity = new UserEntity().parse(json.usuario);
      this._user = user;
    }

  }

  getObject(): ScheduleEntity {
    return this;
  }

  get name(): string {
    return this._id + '' + this._start + '' + this._end;
  }

  get id(): number {
    return this._id;
  }

  get day(): number {
    return this._day;
  }

  get start(): string {
    return this._start;
  }

  get end(): string {
    return this._end;
  }

  get user(): UserEntity {
    return this._user;
  }

  get registry(): string {
    return this._registry;
  }

  get modify(): string {
    return this._modify;
  }
}
