import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {AppSetting} from "../../settings/app.setting";
import {LinkDataEntity} from "../../entities/link-data.entity";
import {UserDiffusionEntity} from "../../entities/user-diffusion.entity";
import {EntityBase} from "../../entities/base/entity-base.entity";
import {LinkDataInterface} from "../../interfaces/link-data.interface";
import {Observable} from "rxjs";
import {ReactionEntity} from "../../entities/reaction.entity";
import {LinkRequest} from "./request/link.request";
import {UserDiffusionRequest} from "./request/user-diffusion.request";
import {HttpBase} from "./http-base.service";

@Injectable()
export class UserDiffusionService implements HttpBase {

  constructor(private http: Http) {}

  baseUrl: string = 'user-diffusion';

  byId(id: number){
    return this.http.get(AppSetting.URI(this.baseUrl + '/' + id))
      .map(response => {
        console.log(response.json().data);
        return new UserDiffusionEntity().parse(response.json().data);
      });
  }

  byUser(id: number){
    return this.http.get(AppSetting.URI(this.baseUrl + '/user/' + id))
      .map(response => {
        console.log(response.json().data);
        return EntityBase.parseArray(UserDiffusionEntity, response.json().data);
      });
  }

  save(comment: UserDiffusionEntity){
    let request = this.toRequest(comment);
    return this.http.post(AppSetting.URI(this.baseUrl), request)
      .map(response => {
        console.log(response.json().data);
        return true;
      });
  }

  reaction(id:number, reaction: boolean){
    return this.http.post(AppSetting.URI(this.baseUrl + '/' + id + '/react/' + ((reaction)?1:0)), {})
      .map(response => {
        return new ReactionEntity().parse(response.json().data);
      });
  }

  comment(id: number, comment: UserDiffusionEntity){
    return this.http.post(AppSetting.URI(this.baseUrl + '/' + id + '/comment'), {text: comment.text})
      .map(response => {
        return new UserDiffusionEntity().parse(response.json().data);
      });
  }

  diffusionComments(id: number){
    return this.http.get(AppSetting.URI(this.baseUrl + '/' + id + '/comment'))
      .map(response => {
        return EntityBase.parseArray(UserDiffusionEntity, response.json().data);
      });
  }

  validateUri(uri: string): Observable<LinkDataInterface>{
    return this.http.post(AppSetting.URI(this.baseUrl + '/validate-uri'), {link: uri})
      .map(response => {
        console.log(response.json().data);
        return this.parseLinkData(response.json().data);
      });
  }


  private parseLinkData(input: any): LinkDataInterface {

    let linkDataObject: any = {};

    linkDataObject.title = input.title;
    linkDataObject.url = input.url;

    if(input.hasOwnProperty('metaTags') && input.metaTags != null){
      if(input.metaTags.hasOwnProperty('description')){
        linkDataObject.description = input.metaTags.description.value;
      }
      if(input.metaTags.hasOwnProperty('image')){
        linkDataObject.image = input.metaTags.image.value;
      }
    }
    if(input.hasOwnProperty('metaProperties') && input.metaProperties != null) {
      if(input.metaProperties.hasOwnProperty('og:description') && linkDataObject.description == null){
        linkDataObject.description = input.metaProperties['og:description'].value;
      }

      if(input.metaProperties.hasOwnProperty('og:image') && linkDataObject.image == null){
        linkDataObject.image = input.metaProperties['og:image'].value;
      }

      if(input.metaProperties.hasOwnProperty('og:video:secure_url') && linkDataObject.videoUrl == null){
        linkDataObject.videoUrl = input.metaProperties['og:video:secure_url'].value;
      }

    }

    let linkData: LinkDataInterface = linkDataObject;
    return linkData;
  }

  toRequest(comment: UserDiffusionEntity): UserDiffusionRequest {

    let userDiffusionRequest: UserDiffusionRequest = {
      text: comment.text,
      user: comment.targetUser.id
    };

    if(comment.disciplines != null && comment.disciplines.length > 0){
      userDiffusionRequest.disciplines = [];
      comment.disciplines.forEach((object) => {
        userDiffusionRequest.disciplines.push(object.id);
      });
    }

    if(comment.image){
      userDiffusionRequest.image.path = comment.image.path;
    }

    if(comment.linkData != null){
      userDiffusionRequest.link = {
        title: comment.linkData.title,
        url: comment.linkData.url,
        image: comment.linkData.image,
        description: comment.linkData.description,
        videoUrl: comment.linkData.videoUrl
      }
    }

    return userDiffusionRequest;
  }


}

