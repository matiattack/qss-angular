import {Component, Input, DoCheck} from "@angular/core";

import {UserDiffusionEntity} from "../../../entities/user-diffusion.entity";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ReactionEntity} from "../../../entities/reaction.entity";
import {UserDiffusionService} from "../../../services/http/user-diffusion.service";


@Component({
  selector: 'comment-detail',
  template: `
<md-card class="diffusion-item comment-item" *ngIf="comment != null">
  <md-card-header class="diffusion-header" *ngIf="comment.user != null">
    <img md-card-avatar src="{{comment.user.image.path}}" style="width: 38px;">
    <md-card-title class="diffusion-user">{{comment.user.name}} {{comment.user.lastName}}</md-card-title>
    <md-card-subtitle class="diffusion-subtitle">{{comment.text}}</md-card-subtitle>
    <md-card-subtitle class="diffusion-actions">
      <button md-icon-button class="pull-left" [ngClass]="{'active': (userReaction!=null && (userReaction.reaction == 1))}" (click)="react(true)">
        <md-icon>thumb_up</md-icon>
      </button>
      <button md-icon-button class="pull-left" [ngClass]="{'active': (userReaction!=null && (userReaction.reaction == 0))}" (click)="react(false)">
        <md-icon>thumb_down</md-icon>
      </button>
    </md-card-subtitle>
  </md-card-header> 
</md-card>
`
})
export class CommentComponent {

  @Input()
  comment: UserDiffusionEntity;
  authUser: UserEntity = AuthService.User;
  userReaction: ReactionEntity = null;

  constructor(private userDiffusionService: UserDiffusionService){ }

  ngOnInit(): void {
    if(this.comment.reactions != null && this.comment.reactions.length > 0){
      for(let reaction of this.comment.reactions){
        if(reaction.user.id == this.authUser.id){
          this.userReaction = reaction;
        }
      }
    }
  }

  react(reaction: boolean): void {
    this.userDiffusionService.reaction(this.comment.id, reaction).subscribe(reaction => {
      if(reaction != null){
        this.userReaction = reaction;
      }
    });
  }

}

