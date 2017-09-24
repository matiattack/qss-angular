import {RequestBaseInterface} from "./request/request-base.interface";
import {IEntityBase} from "../../entities/base/entity-base.entity";

export interface HttpBase {
  toRequest(entity: IEntityBase): RequestBaseInterface;
}
