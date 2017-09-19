import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {AppSetting} from "../settings/app.setting";
import {AuthService} from "./auth.service";
import {ScheduleEntity} from "../entities/schedule.entity";
import {EntityBase} from "../entities/base/entity-base.entity";

export class Day {
  public schedules: ScheduleEntity[];
  constructor(public name: string, public value: number){}
}

@Injectable()
export class ScheduleService {

  constructor(private http: Http, private authService: AuthService) { }

  byId(id: number){
    return this.http.get(AppSetting.URI('schedule/' + id))
      .map(response => {
        return new ScheduleEntity().parse(response.json().data);
      });
  }

  byUser(userId: number){
    return this.http.get(AppSetting.URI('schedule/user/' + userId))
      .map(response => {
        return EntityBase.parseArray(ScheduleEntity, response.json().data);
      });
  }

  save(schedule: ScheduleEntity){
    return this.http.post(AppSetting.URI('schedule'), {day: schedule.day, start: schedule.start, end: schedule.end})
      .map(response => {
        return new ScheduleEntity().parse(response.json().data);
      });
  }

  destroy(ids: number[]){
    return this.http.delete(AppSetting.URI('schedule/'.concat(ids.join())))
      .map(response => {
        return response.json().data;
      })
  }

  update(schedule: ScheduleEntity, id: number){
    return this.http.put(AppSetting.URI('schedule/'.concat(id.toString())), {day: schedule.day, start: schedule.start, end: schedule.end})
      .map(response => {
        return new ScheduleEntity().parse(response.json().data);
      });
  }

  public static days(): Day[]{

    let days: Day[] = [];
    days.push(new Day('Lunes', 1));
    days.push(new Day('Martes', 2));
    days.push(new Day('Miercoles', 3));
    days.push(new Day('Jueves', 4));
    days.push(new Day('Viernes', 5));
    days.push(new Day('Sabado', 6));
    days.push(new Day('Domingo', 7));
    return days;

  }



}
