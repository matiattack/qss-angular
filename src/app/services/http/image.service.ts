import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ImageEntity} from "../../entities/image.entity";
import {EntityBase} from "../../entities/base/entity-base.entity";
import {AppSetting} from "../../settings/app.setting";

@Injectable()
export class ImageService {

  constructor( private http: Http){}

  byUser(id: number){
    return this.http.get(AppSetting.URI('image/user/' + id))
      .map(response => {
        console.log(response.json().data);
        return EntityBase.parseArray(ImageEntity, response.json().data);
      });
  }

}
