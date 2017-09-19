import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {AppSetting} from "../settings/app.setting";

export class ImageEntity extends EntityBase<ImageEntity> implements IEntityBase{

  private _id: number;
  private _path: string;
  private _registro: string;
  private _modificacion: string;

  constructor(path?: string){

    super();

    this._path = path;
  }

  setAttributes(input: any): void {

    this._id = input.id;
    if(input.hasOwnProperty('path') && input.path != null){
      this._path = input.path;
    }else{
      this._path = AppSetting.IMAGE_PLACEHOLDER;
    }

    this._registro = input.registry;
    this._modificacion = input.modification;
  }

  getObject(): ImageEntity {
    return this;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._path;
  }

  get path(): string {
    return this._path;
  }

  get registro(): string {
    return this._registro;
  }

  get modificacion(): string {
    return this._modificacion;
  }

}
