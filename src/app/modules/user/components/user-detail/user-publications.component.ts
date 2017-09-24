import {Component, OnChanges, SimpleChanges} from "@angular/core";
import {UserService} from "../../../../services/http/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {UserEntity} from "../../../../entities/user.entity";
import {UserDiffusionService} from "../../../../services/http/user-diffusion.service";
import {UserDiffusionEntity} from "../../../../entities/user-diffusion.entity";
import {Input} from "@angular/core";
import {DiffusionLink} from "../../../../caches/diffusion.link";


@Component({
  selector: 'user-publications',
  template: `
<div *ngIf="comments.length > 0">
  <comment-list [publications]="comments"></comment-list>
</div>
`
})
export class UserPublicationsComponent implements OnChanges{


  @Input()
  userId: number;
  authUser: UserEntity = AuthService.User;
  comments: UserDiffusionEntity[] = [];

  constructor(private commentService: UserDiffusionService, private publicationControl: DiffusionLink){}

  ngOnInit(){}

  ngOnChanges(changes: SimpleChanges): void {
    this.commentService.byUser(this.userId).subscribe( resp => {
      this.comments = resp;
      console.log(this.comments);
    });

  }



}

