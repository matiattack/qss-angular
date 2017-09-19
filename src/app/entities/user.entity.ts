import {ImageEntity} from "./image.entity";
import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {AppSetting} from "../settings/app.setting";
import {DisciplineEntity} from "./discipline.entity";

export class UserEntity extends EntityBase<UserEntity> implements IEntityBase{

  private _id: number;
  private _state: string;
  private _name: string;
  private _lastName: string;
  private _email: string;
  private _username: string;
  private _birthday: string;
  private _description: string;
  private _sex: number;
  private _image: ImageEntity;
  private _disciplines: DisciplineEntity[];
  private _followers: UserEntity[];
  private _followersCount: number;
  private _following: UserEntity[];
  private _followingCount: number;
  private _estado: string;

  constructor(name?: string, lastName?: string, email?: string) {
    super();
    this._name = name;
    this._lastName = lastName;
    this._email = email;

  }

  setAttributes(input: any): void {

    this._id = input.id;
    this._name = input.nombres;
    this._lastName = input.apellidos;
    this._email = input.correo;
    this._username = input.username;
    this._birthday = input.nacimiento;
    this._description = input.descripcion;
    this._sex = input.sexo;
    this._followersCount = Math.floor(Math.random() * 35);
    this._followingCount = Math.floor(Math.random() * 35);

    if(input.hasOwnProperty('estado') && input.estado != null){
      if(input.estado.nombre != null ){
        this._state = input.estado.nombre;
      }
    }

    if(input.hasOwnProperty('imagen') && input.imagen != null){

      let imagen = new ImageEntity().parse({
        id: input.imagen,
        path: AppSetting.MEDIA_ENDPOINT.concat('/').concat(input.imagen.path)});
      this._image = imagen;

    }else{
      let imagen = new ImageEntity().parse({ path: AppSetting.PROFILE_IMAGE_PLACEHOLDER });
      this._image = imagen;
    }

    this._disciplines = [];
    if(input.hasOwnProperty('disciplinas') && input.disciplinas != null){
      input.disciplinas.forEach((object, index) => {
        if(object.hasOwnProperty('disciplina') && object.disciplina != null){
          this._disciplines.push(new DisciplineEntity().parse(object.disciplina));
        }
      });
    }

    this._followers = [];
    if(input.hasOwnProperty('siguen') && input.siguen != null){
      input.siguen.forEach((object, index) => {
        if(object.hasOwnProperty('seguidor') && object.seguidor != null){
          this._followers.push(new UserEntity().parse(object.seguidor));
        }
      });
    }

    this._following = [];
    if(input.hasOwnProperty('siguiendo') && input.siguiendo != null){
      input.siguiendo.forEach((object, index) => {
        if(object.hasOwnProperty('seguido') && object.seguido != null){
          this._following.push(new UserEntity().parse(object.seguido));
        }
      });
    }

  }

  public parseEntity(input: any) {

    this._id = input.id;
    this._name = input.name;
    this._lastName = input.lastName;
    this._email = input.email;
    this._birthday = input.birthday;
    this._description = input.description;

    return this;
  }

  getObject(): UserEntity {
    return this;
  }

  public isFollowingDiscipline(id: number): boolean{
    for(let discipline of this._disciplines){
      if(discipline.id == id){
        return true;
      }
    }
    return false;
  }

  public isFollowingUser(id: number): boolean {
    for(let following of this._following){
      if(following.id == id){
        return true;
      }
    }
    return false;
  }

  public addFollowing(user: UserEntity): void {
    this._following.push(user);
  }

  public addFollower(user: UserEntity): void {
    this._followers.push(user);
  }

  get disciplines(): DisciplineEntity[] {
    return this._disciplines;
  }
  get followers(): UserEntity[] {
    return this._followers;
  }

  get following(): UserEntity[] {
    return this._following;
  }

  get id(): number {
    return this._id;
  }

  get state(): string {
    return this._state;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get birthday(): string {
    return this._birthday;
  }

  get description(): string {
    return this._description;
  }

  get sex(): number {
    return this._sex;
  }

  get image(): ImageEntity {
    return this._image;
  }

  get estado(): string {
    return this._estado;
  }

  get followersCount(): number {
    return this._followersCount;
  }

  get followingCount(): number {
    return this._followingCount;
  }
  get username(): string {
    return this._username;
  }
}
