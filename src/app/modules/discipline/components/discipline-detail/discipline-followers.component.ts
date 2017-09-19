import {Component, Input} from "@angular/core";
import {UserEntity} from "../../../../entities/user.entity";

@Component({
  selector: 'discipline-followers',
  template: `
<user-list [users]="users" *ngIf="users.length > 0"></user-list>
`
})
export class DisciplineFollowersComponent {

  @Input() users: UserEntity[] = [];

}
