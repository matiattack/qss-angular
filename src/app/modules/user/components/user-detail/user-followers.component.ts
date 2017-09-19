import {Component, OnChanges, SimpleChanges} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserEntity} from "../../../../entities/user.entity";
import {Input} from "@angular/core";


@Component({
  selector: 'user-followers',
  template: `
<user-list [users]="user.followers" *ngIf="user != null; else loading"></user-list>
`
})
export class UserFollowersComponent implements OnChanges{

  @Input()
  userId: number;
  user: UserEntity;

  constructor(private route: ActivatedRoute, private userService: UserService){ }

  ngOnInit(){ }

  ngOnChanges(changes: SimpleChanges): void {

    this.userService.followers(this.userId).subscribe(resp => {
      this.user = resp;
    });

  }

}

