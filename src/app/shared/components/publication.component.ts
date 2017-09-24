import {Component, Input} from "@angular/core";
import {UserEntity} from "../../entities/user.entity";
import {AuthService} from "../../services/auth.service";
import {UserDiffusionEntity} from "../../entities/user-diffusion.entity";
import {UserDiffusionService} from "../../services/http/user-diffusion.service";
import {ReactionEntity} from "../../entities/reaction.entity";
import {DiffusionLink} from "../../caches/diffusion.link";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'user-publication',
  animations: [
    trigger('increase', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(1.5)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  template: `
<md-card class="diffusion-item" *ngIf="publication != null">
  
  <md-card-header class="diffusion-header" *ngIf="publication.user != null">
    <img md-card-avatar src="{{publication.user.image.path}}" style="width: 46px;">
    <md-card-title class="diffusion-user"><a routerLink="/user/{{publication.user.id}}">{{publication.user.name}} {{publication.user.lastName}}</a></md-card-title>
    <md-card-subtitle class="diffusion-date">{{publication.registry}}</md-card-subtitle>
  </md-card-header>
  
  <md-card-content *ngIf="publication.disciplines != null && publication.disciplines.length > 0">
    <md-card-subtitle>Refiriendose a la(s) discipina(s)</md-card-subtitle>
    <md-chip-list>
      <md-chip *ngFor="let discipline of publication.disciplines">{{discipline.name}}</md-chip>
    </md-chip-list>
  </md-card-content>
  
  <md-card-content class="diffusion-content">
    <p>
      {{publication.text}}
    </p>
    <md-card *ngIf="publication.linkData != null">
    
      <md-card-header onclick="window.open(publication.linkData.url, '_system');">
        <img md-card-avatar *ngIf="publication.linkData.image != null" src="{{publication.linkData.image}}" style="width: 72px; height: 72px; flex-shrink: 0;">
        <md-card-title style="margin-top: 10px;">{{publication.linkData.title}}</md-card-title>
        <md-card-subtitle>{{publication.linkData.description}}</md-card-subtitle>
      </md-card-header>
      
    </md-card>
  </md-card-content>
  <img md-card-image *ngIf="publication.image != null" src="{{publication.image.path}}" class="diffusion-image">
  
  <md-card-actions class="diffusion-actions">
  
    <button md-icon-button class="pull-left" [ngClass]="{'active': (userReaction!=null && (userReaction.reaction == 1))}" (click)="react(true)" [@increase]="state">
      <md-icon>thumb_up</md-icon>
    </button>
    <button md-icon-button class="pull-left" [ngClass]="{'active': (userReaction!=null && (userReaction.reaction == 0))}" (click)="react(false)" [@increase]="state">
      <md-icon>thumb_down</md-icon>
    </button>

    <button md-button class="pull-right" (click)="goToDetail()">COMENTARIOS</button>
    
    <div style="clear: both;"></div>
  </md-card-actions>
</md-card>
`
})
export class PublicacionComponent {

  @Input()
  publication: UserDiffusionEntity;

  state: string = 'inactive';

  authUser: UserEntity = AuthService.User;
  userReaction: ReactionEntity = null;

  constructor(private userDiffusionService: UserDiffusionService, private publicationControl: DiffusionLink){ }

  ngOnInit(): void {
    for(let reaction of this.publication.reactions){
      if(reaction.user.id == this.authUser.id){
        this.userReaction = reaction;
      }
    }
  }

  react(reaction: boolean): void {
    this.userDiffusionService.reaction(this.publication.id, reaction).subscribe( reaction => {
      if(reaction != null){

        this.state = 'active';

        setTimeout(() => {

          this.state = 'inactive';
        }, 100);

        this.userReaction = reaction;
      }
    });
  }

  goToDetail(): void {
    this.publicationControl.diffusionDetailLink(this.publication);
  }

}

