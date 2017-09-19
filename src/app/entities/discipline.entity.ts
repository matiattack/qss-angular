import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {UserEntity} from "./user.entity";
import {CategoryEntity} from "./category.entity";
import {ImageEntity} from "./image.entity";
import {AppSetting} from "../settings/app.setting";

export class DisciplineEntity extends EntityBase<DisciplineEntity> implements IEntityBase{

  private _id: number;
  private _name: string;
  private _description: string;
  private _registry: string;
  private _modification: string;
  private _image: ImageEntity;
  private _category: CategoryEntity;
  private _followers: UserEntity[];

  setAttributes(input: any): void {

    this._id = input.id;
    this._name = input.nombre;
    this._description = input.descripcion;
    this._registry = input.registry;
    this._modification = input.modify;

    if(input.hasOwnProperty('categoria')){
      let category = new CategoryEntity().parse(input.categoria);
      this._category = category;
    }

    if(input.hasOwnProperty('imagen') && input.imagen != null){
      this._image = new ImageEntity().parse(input.imagen);
    }else{
      this._image = new ImageEntity().parse({path: AppSetting.DISCIPLINE_IMAGE_PLACEHOLDER});
    }

    this._followers = [];
    if(input.hasOwnProperty('siguiendo') && input.siguiendo != null){
      input.siguiendo.forEach((object, index) => {
        if(object.hasOwnProperty('usuario') && object.usuario != null){
          this._followers.push(new UserEntity().parse(object.usuario));
        }
      });
    }

  }

  getObject(): DisciplineEntity {
    return this;
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

  get category(): CategoryEntity {
    return this._category;
  }

  get followers(): UserEntity[] {
    return this._followers;
  }

  get image(): ImageEntity {
    return this._image;
  }

  public addUser(user: UserEntity){
    this._followers.unshift(user)
  }
}
