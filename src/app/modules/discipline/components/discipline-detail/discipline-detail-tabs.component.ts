import {Component, Input, SimpleChanges} from "@angular/core";
import {DisciplineEntity} from "../../../../entities/discipline.entity";
import {UserEntity} from "../../../../entities/user.entity";
import {AuthService} from "../../../../services/auth.service";
import {DisciplineService} from "../../../../services/http/discipline.service";
import {ToolbarService} from "../../../../shared/services/toolbar.service";
import {DiffusionInterface} from "../../../../interfaces/diffusion.interface";
import {DiffusionLink} from "../../../../caches/diffusion.link";

@Component({
  selector: 'discipline-detail-tabs',
  template: `
<md-card>
  <!--<img md-card-image src="http://localhost/qss-core/public/images/static/image8.jpg" >-->
  <md-card-title>{{discipline.name}}</md-card-title>
  <md-card-subtitle style="margin-top: 10px;">
    <p>{{discipline.description}}</p>
  </md-card-subtitle>
  <md-card-actions>
    <button md-button disabled class="pull-left">{{countFollowers}} <md-icon>people_outline</md-icon></button>
    <div *ngIf="isFollowing;">
      <button md-raised-button class="pull-right" color="primary" (click)="addDiffusion(true);">Evento</button>
      <button md-raised-button class="pull-right" color="primary" (click)="addDiffusion(false);">Publicacion</button>
    </div>
    <div style="clear: both;"></div>
  </md-card-actions>
</md-card>

<md-tab-group #tabGroup>

  <md-tab>
    <ng-template md-tab-label >
      PUBLICACIONES
    </ng-template>
    <discipline-publications [disciplineId]="discipline.id"></discipline-publications>
  </md-tab>

  <md-tab>
    <ng-template md-tab-label >
      SEGUIDORES
    </ng-template>
    <discipline-followers [users]="discipline.followers"></discipline-followers>
  </md-tab>
 
</md-tab-group>
`
})
export class DisciplineDetailTabsComponent {

  @Input() discipline: DisciplineEntity;

  countFollowers: number = 25;
  isFollowing: boolean = false;

  authUser: UserEntity = AuthService.User;

  constructor(private disciplineService: DisciplineService, private toolbarService: ToolbarService, private diffusionLink: DiffusionLink){}

  ngOnChanges(changes: SimpleChanges): void {
    this.discipline.followers.forEach((object, index) => {
      if(object.id == this.authUser.id){
        this.isFollowing = true;
      }
    });
    this.defineLayoutOptions();
  }

  followDiscipline(): void {
    let action: boolean = (!this.isFollowing);
    this.disciplineService.follow(this.discipline.id, action).subscribe(response => {
      this.isFollowing = action;
      this.countFollowers++;
      this.defineLayoutOptions();
    });
  }

  defineLayoutOptions(): void {
    if(this.isFollowing){
      this.toolbarService.setRightButton({text: 'DEJAR', icon: '', click: ()=>{this.followDiscipline()}});
    }else{
      this.toolbarService.setRightButton({text: 'SEGUIR', icon: 'plus_one', click: ()=>{this.followDiscipline()}});
    }
  }

  addDiffusion(isEvent: boolean): void {
    this.diffusionLink.addDiffusionLink(
      <DiffusionInterface>{
        disciplines: [this.discipline]
      }, isEvent);
  }

}
