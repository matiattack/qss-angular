import {Injectable} from "@angular/core";
import {EventEntity} from "../../entities/event.entity";
import {Http} from "@angular/http";
import {AppSetting} from "../../settings/app.setting";
import {HttpBase} from "./http-base.service";
import {EventRequest} from "./request/event.request";
import {Observable} from "rxjs";

@Injectable()
export class EventService implements HttpBase {

  constructor(private http: Http) {}

  baseUrl: string = 'event';

  save(entity: EventEntity): Observable<any>{
    return this.http.post(AppSetting.URI(this.baseUrl), this.toRequest(entity))
      .map( response => {
        console.log(response.json().data);
      });
  }

  toRequest(entity: EventEntity): EventRequest {

    let request: EventRequest = <EventRequest>{
      isPublic: entity.isPublic,
      startDate: AppSetting.FORMATDATE(entity.startDate),
      endDate: AppSetting.FORMATDATE(entity.endDate),
      startTime: entity.startTime,
      endTime: entity.endTime,
      name: entity.name,
      coverImage: entity.coverImage,
      disciplines: [],
      description: null
    };

    entity.disciplines.forEach((object, index) => {
      request.disciplines.push(object.id);
    });

    if(entity.description != null){
      request.description = entity.description;
    }

    return request;
  }

}
