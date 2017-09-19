import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Subject} from "rxjs";

import {UserEntity} from "../entities/user.entity";
import {AppSetting} from "../settings/app.setting";
import {ImageEntity} from "../entities/image.entity";

@Injectable()
export class AuthService {

  constructor(private http: Http){}

  currentUser = new Subject<UserEntity>();

  getCurrentUser(): Subject<UserEntity> {
    return this.currentUser;
  }

  login(username, password) {
    return this.http.post(AppSetting.URI('login'), { username: username, password: password })
      .map((response: Response) => {
        let resp = response.json();
        if (resp && resp.token)
          localStorage.setItem('token', resp.token);
      });
  }

  authenticate(){
    return this.http.get(AppSetting.URI('login/authenticated'))
      .map((response: Response) => {
        let resp = response.json();
        if(resp && resp.data){
          let user: UserEntity = new UserEntity().parse(resp.data);
          localStorage.setItem('byUser', JSON.stringify(resp.data));
          localStorage.setItem('tokenDate', (new Date().getTime()).toString());
          this.currentUser.next(user);
          return user;
        }else return null;
      });
  }

  public static get User(): UserEntity {
    if(!localStorage.getItem('byUser')){
      return null;
    }
    let userJson = JSON.parse(localStorage.getItem('byUser'));
    return new UserEntity().parse(userJson);
  }

  logOut(): void {
    localStorage.removeItem('byUser');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenDate');
    this.currentUser.next(null);
  }

  public updateImage(image: ImageEntity){

    return this.http.post(AppSetting.URI('image/set-profile'), {id: image.id, path: image.path})
      .map((response: Response) => {
        console.log('Auth.setImage');
        console.log(response.json().data);
        if(this.updateAuthImage(response.json().data)){
          console.log('Se seteo imagen');
          this.currentUser.next(AuthService.User);
        }
        return new ImageEntity().parse(response.json().data);

      });
  }

  public updateData(user: UserEntity){

    let authUser: UserEntity = AuthService.User;
    let data = {
      name: (user.name != null && user.name.trim() != '' && user.name.trim() != authUser.name)?user.name:'',
      lastName: (user.lastName != null && user.lastName.trim() != '' && user.lastName.trim() != authUser.lastName)?user.lastName:'',
      email: (user.email != null && user.email.trim() != '' && user.email.trim() != authUser.email)?user.email:'',
      description: (user.description != null && user.description.trim() != '' && user.description.trim() != authUser.description)?user.description:'',
    };

    return this.http.put(AppSetting.URI('user/' + authUser.id), data)
      .map( response => {
        console.log('Se editará con la respuesta:');
        console.log(response.json().data);
        if(this.updateAuthData(response.json().data)){
          this.currentUser.next(AuthService.User);
        }
        return AuthService.User;
      });
  }

  public updatePassword(actual: string, password: string){
    return this.http.put(AppSetting.URI('user/' + AuthService.User.id), {actual, password})
      .map( response => {
        return response.json().message;
      });
  }

  private updateAuthData(data): boolean {
    let user = new UserEntity().parse(data);
    if(user.id != 0){
      console.log('Se modificara json');
      let userJson = JSON.parse(localStorage.getItem('byUser'));
      userJson.nombres = user.name;
      userJson.apellidos = user.lastName;
      userJson.correo = user.email;
      userJson.descripcion = user.description;
      localStorage.setItem('byUser', JSON.stringify(userJson));
      return true;
    }
    return false;
  }

  private updateAuthImage(data): boolean {
    let image = new ImageEntity().parse(data);
    if(image.id != 0 && image.path.trim()!=''){
      let userJson = JSON.parse(localStorage.getItem('byUser'));
      userJson.imagen = data;
      localStorage.setItem('byUser', JSON.stringify(userJson));
      return true;
    }
    return false;
  }

}
