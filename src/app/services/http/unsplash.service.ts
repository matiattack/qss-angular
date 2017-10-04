import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {EntityBase} from "../../entities/base/entity-base.entity";
import {UnsplashEntity} from "../../entities/unsplash.entity";

@Injectable()
export class UnsplashService {

  constructor(private http: Http) {}

  getByKeyWord(keyword: string){
    return this.http.get('https://api.unsplash.com/search/photos?page=1&per_page=10&query='.concat(keyword), this.headerOptions)
      .map(response => {
        console.log('getByKeyWord', response.json());
        return EntityBase.parseArray(UnsplashEntity, response.json().results);
      });

  }

  private get headerOptions(): RequestOptions {

    let headers = new Headers();
    headers.append('Authorization', 'Client-ID 87014a67410c5c4363802715e1da510952086272ce0e7f374a5ac2109de2f431');

    return new RequestOptions({ headers: headers });
  }

}
