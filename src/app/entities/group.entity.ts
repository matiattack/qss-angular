import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {DisciplineEntity} from "./discipline.entity";
import {UserEntity} from "./user.entity";

export class GroupEntity extends EntityBase<GroupEntity> implements IEntityBase{

  private _id: number;
  private _name: string;
  private _description: string;
  private _registry: string;
  private _modification: string;
  private _membresy: boolean;
  private _capacity: number;
  private _disciplines: DisciplineEntity[];
  private _team: UserEntity[];

  setAttributes(input: any){

    this._id = input._id;
    this._name = input.nombre;
    this._description = input.description;
    this._registry = input.registry;
    this._modification = input.modify;
    this._membresy = input.membresia;
    this._capacity = input.capacidad;

  }

  getObject(): GroupEntity {
    return this;
  }

  getParsedObject(json: any): GroupEntity {
    return new GroupEntity().parse(json);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get registry(): string {
    return this._registry;
  }

  get modification(): string {
    return this._modification;
  }

  get membresy(): boolean {
    return this._membresy;
  }

  get capacity(): number {
    return this._capacity;
  }

  get disciplines(): DisciplineEntity[] {
    return this._disciplines;
  }

  get team(): UserEntity[] {
    return this._team;
  }
}
