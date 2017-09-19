import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {DisciplineEntity} from "../entities/discipline.entity";
import {AppSetting} from "../settings/app.setting";
import {CategoryEntity} from "../entities/category.entity";
import {EntityBase} from "../entities/base/entity-base.entity";

@Injectable()
export class DisciplineService {

  constructor(private http: Http) {}

  byId(id: number){
    return this.http.get(AppSetting.URI('disciplines/' + id))
      .map(response => {
        return new DisciplineEntity().parse(response.json().data);
      });
  }

  categories(){
    return this.http.get(AppSetting.URI('disciplines/categories'), {})
      .map(response => {
        return EntityBase.parseArray(CategoryEntity, response.json().data);
      });
  }

  /*search(quest: string, category: number){
    return this.http.post(AppSetting.URI('disciplines/search'), { quest: quest, category: category })
      .map(response => {
        console.log(response);
      });
  }*/

  follow(id: number, action: boolean) {
    return this.http.post(AppSetting.URI('disciplines/' + id + '/follow'), {action: action})
      .map(response => {
        console.log(response);
        //this.authService.update();
        //return new FollowDiscipline().parse(response.json().data)
      });
  }
}

