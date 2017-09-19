import {Component} from "@angular/core";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ImageService} from "../../../services/image.service";
import {ImageEntity} from "../../../entities/image.entity";
import {AppSetting} from "../../../settings/app.setting";

@Component({
  selector: 'setting-password',
  template: `
<style>
  .actual-image {
    width: 160px; height: 160px; border-radius: 50%; margin: auto; 
    background-repeat: no-repeat; background-size: cover;
  }
</style>
<md-card>
<md-card-content>
  
  <md-card-subtitle *ngIf="!hasError">Llene los datos para cambiar su contraseña</md-card-subtitle>

  <md-card-header *ngIf="hasError">
    <md-card-title>Error</md-card-title>
    <md-card-subtitle>{{errorMessage}}</md-card-subtitle>
    <md-icon md-card-avatar>error_outline</md-icon>
  </md-card-header>

  <md-input-container class="full-width">
    <input type="password" mdInput placeholder="Actual contraseña" #actual>
  </md-input-container>
    
  <md-input-container class="full-width">
    <input type="password" mdInput placeholder="Nueva contraseña" #password>
  </md-input-container>  
  
  <md-input-container class="full-width">
    <input type="password" mdInput placeholder="Repita nueva contraseña" #repeat>
  </md-input-container>
</md-card-content>



<md-card-actions>
  <button md-raised-button color="primary" (click)="changePassword(actual.value, password.value, repeat.value);">Cambiar</button>
  <md-card-subtitle class="pull-right">{{responseMessage}}</md-card-subtitle>
</md-card-actions>

</md-card>
`
})
export class SettingPasswordComponent {

  hasError: boolean = false;
  errorMessage: string = '';
  user: UserEntity = AuthService.User;
  responseMessage: string = '';

  constructor(private authService: AuthService){}

  changePassword(actual: string, password: string, repeat: string): void{

    this.hasError = false;
    if(actual.trim() == '' || password.trim() == '' || repeat.trim() == ''){
      this.hasError = true;
      this.errorMessage = 'Debe llenar todos los campos';
    }

    if(password.trim() != repeat.trim()){
      this.hasError = true;
      this.errorMessage = 'La contraseña y su repeticion deben ser iguales';
    }

    if(!this.hasError){
      this.authService.updatePassword(actual, password).subscribe( responseMessage => {
        if(responseMessage != null){
          this.responseMessage = responseMessage;
        }else{
          this.responseMessage = 'Contraseña modificada';
        }

      });
    }

  }

}
