import {IEntityBase, EntityBase} from "./base/entity-base.entity";

export class LinkDataEntity extends EntityBase<LinkDataEntity> implements IEntityBase{

  private _id: number;
  private _title: string;
  private _url: string;
  private _image: string;
  private _description: string;
  private _name: string;
  private _videoUrl: string

  constructor(title?: string, url?: string, description?: string, image?: string, videoUrl?: string){

    super();

    this._title = title;
    this._url = url;
    this._description = description;
    this._image = image;
    this._videoUrl = videoUrl;
  }

  setAttributes(input: any): void {
    this._title = input.title;
    this._url = input.url;
    this._image = input.image;
    this._description = input.description;
    this._videoUrl = input.videoUrl;
  }

  getObject(): LinkDataEntity {
    return this;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get image(): string {
    return this._image;
  }

  get description(): string {
    return this._description;
  }

  get name(): string {
    return this._name;
  }

  get url(): string {
    return this._url;
  }

  get videoUrl(): string {
    return this._videoUrl;
  }
}
