import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {UserEntity} from "../entities/user.entity";
import {AppSetting} from "../settings/app.setting";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  byId(id: number){
    return this.http.get(AppSetting.URI('user/' + id))
      .map(response => {
        /*this.cacheUser = new UserEntity().parse(response.json().data);
        return this.cacheUser;*/
        return new UserEntity().parse(response.json().data);
      });
  }

  save(user: UserEntity, password: string){
    return this.http.post(AppSetting.URI('user'), { name: user.name, lastName: user.lastName, email: user.email, password: password})
      .map(response => {
        return new UserEntity().parse(response.json().data);
      });
  }

  follow(id: number, action: boolean){
    return this.http.post(AppSetting.URI('user/' + id + '/follow'), {action: action})
      .map(response => {
        return response.json().data;
      });
  }

  followings(id: number){
    return this.http.get(AppSetting.URI('user/' + id + '/followings'))
      .map(response => {
        return new UserEntity().parse(response.json().data);
      });
  }

  followers(id: number){
    return this.http.get(AppSetting.URI('user/' + id + '/followers'))
      .map(response => {
        return new UserEntity().parse(response.json().data);
      });
  }



  /*
  * private cacheUser: UserEntity;

   constructor(private http: Http) {}

   byId(id: number){
   if(this.cacheUser != null && this.cacheUser.id == id){
   console.log('return this.cacheUser byId');
   return Observable.of(this.cacheUser);
   }else{
   return this.http.get(AppSetting.URI('user/' + id))
   .map(response => {
   this.cacheUser = new UserEntity().parse(response.json().data);
   return this.cacheUser;
   });
   }
   }

   follow(id: number, action: boolean){
   return this.http.post(AppSetting.URI('user/' + id + '/follow'), {action: action})
   .map(response => {
   return response.json().data;
   });
   }

   followings(id: number){
   if(this.cacheUser!= null && this.cacheUser.id == id && this.cacheUser.following.length > 0){
   console.log('this.cacheUser has following');
   return Observable.of(this.cacheUser);
   }else{
   return this.http.get(AppSetting.URI('user/' + id + '/followings'))
   .map(response => {
   console.log('followings(id: number)');
   let responseUser = new UserEntity().parse(response.json().data);
   if(this.cacheUser == null){
   this.cacheUser = responseUser;
   }else if(this.cacheUser.following.length == 0){
   responseUser.following.forEach((object, index) => {
   this.cacheUser.addFollowing(object);
   });
   }
   return this.cacheUser;
   });
   }
   }

   followers(id: number){
   if(this.cacheUser!= null && this.cacheUser.id == id && this.cacheUser.followers.length > 0){
   console.log('this.cacheUser has followers');
   return Observable.of(this.cacheUser);
   }else{
   return this.http.get(AppSetting.URI('user/' + id + '/followers'))
   .map(response => {
   console.log('followers(id: number)');
   let responseUser = new UserEntity().parse(response.json().data);
   if(this.cacheUser == null){
   this.cacheUser = responseUser;
   }else if(this.cacheUser.followers.length == 0){
   responseUser.followers.forEach((object, index) => {
   this.cacheUser.addFollower(object);
   });
   }
   return this.cacheUser;
   });
   }
  * */

}
