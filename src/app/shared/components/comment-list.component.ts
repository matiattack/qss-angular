import {Component, Input} from "@angular/core";
import {UserEntity} from "../../entities/user.entity";
import {AuthService} from "../../services/auth.service";
import {UserDiffusionEntity} from "../../entities/user-diffusion.entity";
import {UserDiffusionService} from "../../services/http/user-diffusion.service";
import {ReactionEntity} from "../../entities/reaction.entity";

@Component({
  selector: 'comment-list',
  template: `
<style>
.comment-user{
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px !important;
}
.comment-item{
  border-bottom: solid 1px #ddd;
}
.comment-content {
  font-size: 16px;
}
.comment-actions {
  color: darkgray;
}

.comment-actions .active {
  color: deepskyblue;
}
.comment-date{
  font-size: 12px;
}
.comment-header{
  margin-bottom: 16px;
}
</style>
<div *ngIf="publications.length > 0">
  <div *ngFor="let comment of publications" >
    <user-publication [publication]="comment"></user-publication>
  </div>
</div>
`
})
export class CommentListComponent {

  @Input()
  publications: UserDiffusionEntity[];
  authUser: UserEntity = AuthService.User;

  constructor(private userDiffusionService: UserDiffusionService){ }

  react(difussion: number, reaction: boolean): void {
    this.userDiffusionService.reaction(difussion, reaction).subscribe( reaction => {

      console.log(reaction);
    });
  }

  isReacted(reactions: ReactionEntity[]): ReactionEntity {

    for(let reaction of reactions){
      if(reaction.user.id == this.authUser.id){
        return reaction;
      }
    }

    return null;
  }


}

