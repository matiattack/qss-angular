import {StreetEntity} from "../entities/street.entity";

export interface LocationInterface {
  street: StreetEntity;
  city: string;
  state: string;
  country: string;
}
