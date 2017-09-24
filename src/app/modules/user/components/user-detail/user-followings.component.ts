import {Component, OnChanges, SimpleChanges} from "@angular/core";
import {UserService} from "../../../../services/http/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserEntity} from "../../../../entities/user.entity";
import {Input} from "@angular/core";


@Component({
  selector: 'user-following',
  template: `
<user-list [users]="user.following" *ngIf="user != null; else loading"></user-list>
`
})
export class UserFollowingsComponent implements OnChanges{

  @Input()
  userId: number;
  user: UserEntity;

  constructor(private route: ActivatedRoute, private userService: UserService){}

  ngOnInit(){ }

  ngOnChanges(changes: SimpleChanges): void {

    this.userService.followings(this.userId).subscribe(resp => {
      this.user = resp;
    });

  }

}
