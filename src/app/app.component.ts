import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

import {AuthService} from "./services/auth.service";
import {UserEntity} from "./entities/user.entity";
import 'rxjs/add/operator/startWith';
import {ToolbarService} from "./shared/services/toolbar.service";
import {DiffusionLink} from "./caches/diffusion.link";
import {FooterControl} from "./controls/footer.control";
import {FooterSetting} from "./settings/footer.setting";
import {FooterInterface} from "./interfaces/footer.interface";


@Component({
  selector: 'app-root',
  template: `
<style>
.example-fab {
  position: fixed;
  right: 20px;
  bottom: 10px;
}
.app-content {
  /*min-height: 600px;*/
}
.app-sidenav {
  width: 90%;
}
.app-sidenav .app-sidenav-menu {
  text-align: left;
  width: 100%;
} 
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%  !important;
}
.has-toolbar{
  padding-top: 56px;
}
</style>

<app-toolbar (onMenu)="sidenav.toggle();" style="position: fixed; top:0; left: 0px; z-index: 1000; width: 100%;"></app-toolbar>

<md-sidenav-container [ngClass]="{'has-toolbar': hasToolbar}">
  <md-sidenav #sidenav class="app-sidenav" style="padding-top: 56px;" mode="over">
    
    <md-nav-list *ngIf="userApp != null">    
      <md-list-item>
        <img md-list-avatar src="{{userApp.image.path}}" style="width: 32px; height: 32px;">
        <a md-line routerLink="/user/{{userApp.id}}" class="app-sidenav-menu" (click)="sidenav.close()">Mi perfil</a>
      </md-list-item>
      <md-list-item>
        <md-icon md-list-icon>home</md-icon>
        <a md-line routerLink="home" class="app-sidenav-menu" (click)="sidenav.close()">Inicio</a>
      </md-list-item>
      <md-list-item>
        <md-icon md-list-icon>people</md-icon>
        <a md-line routerLink="user" class="app-sidenav-menu" (click)="sidenav.close()">Usuarios</a>
      </md-list-item>
      <md-list-item>
        <md-icon md-list-icon>directions_run</md-icon>
        <a md-line routerLink="discipline" class="app-sidenav-menu" (click)="sidenav.close()">Disciplinas</a>
      </md-list-item>
      <md-list-item>
        <md-icon md-list-icon>settings_power</md-icon>
        <a md-line (click)="signOut()" class="app-sidenav-menu" (click)="sidenav.close()">Cerrar sesión</a>
      </md-list-item>
    </md-nav-list>
    
    <button md-button (click)="sidenav.close()" class="app-sidenav-menu">
      <md-icon>keyboard_backspace</md-icon>
    </button>
     
  </md-sidenav>
  
  
  
  <div class="app-content" [ngStyle]="{'min-height' : appHeight, 'background-color' : '#fafafa'}">
    <router-outlet></router-outlet>
  </div>
  
</md-sidenav-container>

<div class="fixed-footer" *ngIf="footer != null">
  <app-footer [footer]="footer"></app-footer>
</div>
`
})
export class AppComponent implements OnInit {

  appHeight: any;
  userApp: UserEntity = null;
  hasToolbar: boolean = true;
  footer: FooterInterface;

  userForPost: UserEntity = null;
  wantComment: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private postService: DiffusionLink,
    private footerControl: FooterControl,
    private toolbarService: ToolbarService,
  ){ }

  ngOnInit(){

    this.toolbarService.getToolbar().subscribe( toolbar => {
      this.hasToolbar = !toolbar.hidden;
    })

    this.appHeight = (window.screen.height - 56) + "px";

    this.authService.getCurrentUser().subscribe( currentUser => {
      this.userApp = currentUser;
      if(currentUser == null){
        this.router.navigate(['/']);
      }
    });

    if(AuthService.User != null){
      this.userApp = AuthService.User;
    }

    this.footerControl.control().subscribe( footer => {
      this.footer = footer;
    });
  }

  signOut(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.location.back();
  }

}
