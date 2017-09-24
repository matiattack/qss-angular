import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AppSetting} from "../../settings/app.setting";
import {StreetEntity} from "../../entities/street.entity";
import {LocationInterface} from "../../interfaces/location.interface";
import {EntityBase} from "../../entities/base/entity-base.entity";

@Injectable()
export class LocationService {

  constructor(private http: Http) { }

  save(location: LocationInterface){

    let data: any = {
      name: location.street.name,
      number: location.street.number,
      longitude: location.street.longitude,
      latitude: location.street.latitude,
      city: location.city,
      state: location.state,
      country: location.country
    };

    return this.http.post(AppSetting.URI('location'), data)
      .map(response => {
        return new StreetEntity().parse(response.json().data);
      });
  }

  byUser(userId: number){
    return this.http.get(AppSetting.URI('location/user/' + userId))
      .map(response => {
        return EntityBase.parseArray(StreetEntity, response.json().data);
      });
  }

  destroy(ids: number[]){
    return this.http.delete(AppSetting.URI('location/'.concat(ids.join())))
      .map(response => {
        return response.json().data;
      });
  }

}
