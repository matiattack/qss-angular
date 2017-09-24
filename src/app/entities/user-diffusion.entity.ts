import {EntityBase, IEntityBase} from "./base/entity-base.entity";
import {UserEntity} from "./user.entity";
import {ImageEntity} from "./image.entity";
import {AppSetting} from "../settings/app.setting";
import {LinkDataEntity} from "./link-data.entity";
import {LinkDataInterface} from "../interfaces/link-data.interface";
import {LocalImageInterface} from "../interfaces/local-image.interface";
import {ReactionEntity} from "./reaction.entity";
import {DisciplineEntity} from "./discipline.entity";

export class UserDiffusionEntity extends EntityBase<UserDiffusionEntity> implements IEntityBase{

  private _id: number;
  private _text: string;
  private _modification: string;
  private _registry: string;
  private _image: ImageEntity;
  private _user: UserEntity;
  private _targetUser: UserEntity;
  private _linkData: LinkDataEntity;
  private _reactions: ReactionEntity[];
  private _disciplines: DisciplineEntity[];

  constructor(text?: string, user?: UserEntity, disciplines?: DisciplineEntity[], link?: LinkDataInterface, image?: LocalImageInterface){

    super();

    this._text = text;
    this._targetUser = (user)?user:null;
    this._linkData = (link)?new LinkDataEntity(link.title, link.url, link.description, link.image, link.videoUrl):null;
    this._image = (image)?new ImageEntity(image.base64url):null;
    this._disciplines = (disciplines)?disciplines:null;

  }

  setAttributes(input: any): void {

    this._id = input.id;
    this._text = input.texto;
    this._registry = input.registro;

    if(input.hasOwnProperty('usuario') && input.usuario != null){
      this._user = new UserEntity().parse(input.usuario);
    }

    if(input.hasOwnProperty('usuario_publicacion') && input.usuario_objetivo != null){
      this._targetUser = new UserEntity().parse(input.usuario_publicacion);
    }

    if(input.hasOwnProperty('imagen') && input.imagen != null){
      this._image = new ImageEntity().parse({id: input.imagen.id, path: AppSetting.MEDIA_ENDPOINT + input.imagen.path});//Dar una vuelta
    }

    if(input.hasOwnProperty('urlEnlace') && input.urlEnlace != null && input.urlEnlace.trim()!=''){
      this._linkData = new LinkDataEntity(input.tituloEnlace, input.urlEnlace, input.descripcionEnlace, input.imagenEnlace, input.videoEnlace);
    }

    if(input.hasOwnProperty('reacciones') && input.reacciones != null){
      this._reactions = EntityBase.parseArray(ReactionEntity, input.reacciones);
    }

    if(input.hasOwnProperty('publicacion_disciplinas') && input.publicacion_disciplinas != null && input.publicacion_disciplinas.length > 0){
      this._disciplines = [];
      input.publicacion_disciplinas.forEach((object) => {
        if(object.hasOwnProperty('disciplina')){
          let discipline: DisciplineEntity = new DisciplineEntity().parse(object.disciplina);
          this._disciplines.push(discipline);
        }
      });
    }

  }


  getObject(): UserDiffusionEntity {
    return this;
  }

  get id(): number {
    return this._id;
  }

  get text(): string {
    return this._text;
  }

  get modification(): string {
    return this._modification;
  }

  get user(): UserEntity {
    return this._user;
  }

  get registry(): string {
    return this._registry;
  }

  get targetUser(): UserEntity {
    return this._targetUser;
  }

  get image(): ImageEntity {
    return this._image;
  }

  get linkData(): LinkDataEntity {
    return this._linkData;
  }

  get reactions(): ReactionEntity[] {
    return this._reactions;
  }

  get disciplines(): DisciplineEntity[] {
    return this._disciplines;
  }

  set id(value: number) {
    this._id = value;
  }

  set text(value: string) {
    this._text = value;
  }

  set modification(value: string) {
    this._modification = value;
  }

  set registry(value: string) {
    this._registry = value;
  }

  set image(value: ImageEntity) {
    this._image = value;
  }

  set user(value: UserEntity) {
    this._user = value;
  }

  set targetUser(value: UserEntity) {
    this._targetUser = value;
  }

  set linkData(value: LinkDataEntity) {
    this._linkData = value;
  }

  set reactions(value: ReactionEntity[]) {
    this._reactions = value;
  }

  set disciplines(value: DisciplineEntity[]) {
    this._disciplines = value;
  }
}
