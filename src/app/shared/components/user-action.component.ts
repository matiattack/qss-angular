import {Component, Input} from "@angular/core";
import {UserEntity} from "../../entities/user.entity";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'user-action',
  template: `
<div *ngIf="!authUser.isFollowingUser(user.id); else unfollow">
  <button followAction md-mini-fab  
    [followActionUser]="user" 
    color="default" ><md-icon>star</md-icon>
  </button>
</div>
<ng-template #unfollow>
  <button followAction md-mini-fab 
    [followActionUser]="user" 
    color="primary"><md-icon>star_border</md-icon>
  </button>
</ng-template>
`
})
export class UserActionComponent {

  @Input()
  user: UserEntity;
  authUser: UserEntity = AuthService.User;

  constructor(){}

}
