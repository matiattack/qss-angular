import {Component} from "@angular/core";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'setting-account',
  template: `
<style>
.item-name {
  color: rgba(0,0,0,.54);
}
.setting-list{
  background-color: #fff;
}
.setting-item {
  border-top: solid 1px #ddd;
}
.setting-item:first-child {
  border-top: 0px !important;
}
</style>

<md-nav-list class="setting-list">

  <md-list-item class="setting-item" editAuth editAuthProp="name" editAuthPropTitle="Ingrese su(s) nombre(s)" [enableEdit]="true" (onAction)="setAuth();">
    <span md-line class="item-name">Nombres</span>
    <span md-line>{{user.name}}</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </md-list-item>

  <md-list-item class="setting-item" editAuth editAuthProp="lastName" editAuthPropTitle="Ingrese su(s) nombre(s)" [enableEdit]="true" (onAction)="setAuth();">
    <span md-line class="item-name">Apellidos</span>
    <span md-line>{{user.lastName}}</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </md-list-item>

  <md-list-item class="setting-item" editAuth editAuthProp="username" editAuthPropTitle="Ingrese su nombre de usuario" [enableEdit]="true"  (onAction)="setAuth();">
    <span md-line class="item-name">Nombre de usuario</span>
    <span md-line>{{user.username}}</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </md-list-item>
  
  <md-list-item class="setting-item" editAuth editAuthProp="email" editAuthPropTitle="Ingrese su correo electrónico" [enableEdit]="true" (onAction)="setAuth();">
    <span md-line class="item-name">Correo electrónico</span>
    <span md-line>{{user.email}}</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </md-list-item>
  
  <a md-list-item class="setting-item" routerLink="/setting/password">
    <span md-line class="item-name">Contraseña</span>
    <span md-line>&nbsp;</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </a>
  
  <a md-list-item class="setting-item" routerLink="/setting/schedule">
    <span md-line class="item-name">Horario</span>
    <span md-line>Lun. Mar. Jue. Sab.</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </a>
  
  <a md-list-item class="setting-item" routerLink="/setting/location">
    <span md-line class="item-name">Ubicación</span>
    <span md-line>Victor Manuel 1408</span>
    <button md-mini-fab>
       <md-icon>create</md-icon>
    </button>
  </a>
  
</md-nav-list>
`
})
export class SettingAccountComponent {


  user: UserEntity = AuthService.User;
  constructor(){}

  setAuth(){
    this.user = AuthService.User;
  }

}
