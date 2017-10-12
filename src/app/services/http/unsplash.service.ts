import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {EntityBase} from "../../entities/base/entity-base.entity";
import {UnsplashEntity} from "../../entities/unsplash.entity";
import {UnsplashResponse} from "./response/unsplash.response";
import {Observable} from "rxjs";

@Injectable()
export class UnsplashService {

  constructor(private http: Http) {}

  getByKeyWord(keyword: string, page: number): Observable<UnsplashResponse>{
    return this.http.get('https://api.unsplash.com/search/photos?page=' + page + '&per_page=6&query='.concat(keyword), this.headerOptions)
      .map(response => {
        return <UnsplashResponse>{
          total: response.json().total,
          totalPages: response.json().total_pages,
          data: EntityBase.parseArray(UnsplashEntity, response.json().results)
        };
      });

  }

  private get headerOptions(): RequestOptions {

    let headers = new Headers();
    headers.append('Authorization', 'Client-ID 87014a67410c5c4363802715e1da510952086272ce0e7f374a5ac2109de2f431');

    return new RequestOptions({ headers: headers });
  }

}
