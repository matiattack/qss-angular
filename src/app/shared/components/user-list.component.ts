import {Component, Input} from "@angular/core";
import {UserEntity} from "../../entities/user.entity";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'user-list',
  template: `
<style>
.user-list-item {
  border-bottom: solid 1px #ddd;
}
</style>
<md-nav-list *ngIf="users.length > 0">
  <md-list-item 
    *ngFor="let user of users" class="user-list-item">
    <img md-list-avatar src="{{user.image.path}}" style="width: 45px; height: 45px;">
    <a md-line routerLink="/user/{{user.id}}">{{user.name}} {{user.lastName}}</a>
    
    <button followAction md-icon-button
    *ngIf="!authUser.isFollowingUser(user.id)"  
    [followActionUser]="user">
      <md-icon>person_add</md-icon>
   </button>
   
  </md-list-item>
</md-nav-list>
`
})
export class UserListComponent {

  @Input()
  users: UserEntity[];
  authUser: UserEntity = AuthService.User;

  constructor(){}



}
