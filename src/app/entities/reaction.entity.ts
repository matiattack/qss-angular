import {IEntityBase, EntityBase} from "./base/entity-base.entity";
import {UserEntity} from "./user.entity";

export class ReactionEntity extends EntityBase<ReactionEntity> implements IEntityBase{

  private _id: number;
  private _user: UserEntity;
  private _reaction: number;

  setAttributes(input: any): void {

    this._id = input.id;
    this._reaction = input.tipo;

    if(input.hasOwnProperty('usuario') && input.usuario != null){
      this._user = new UserEntity().parse(input.usuario);
    }
  }

  get id(): number {
    return this._id;
  }

  get user(): UserEntity {
    return this._user;
  }

  get reaction(): number {
    return this._reaction;
  }

  getObject(): ReactionEntity {
    return this;
  }
}
