import {Component, Input, DoCheck, OnChanges, SimpleChanges} from "@angular/core";
import {UserEntity} from "../../../../entities/user.entity";
import {DiffusionLink} from "../../../../caches/diffusion.link";
import {AuthService} from "../../../../services/auth.service";
import {ScheduleService} from "../../../../services/schedule.service";
import {ScheduleEntity} from "../../../../entities/schedule.entity";
import {ViewChild} from "@angular/core";
import {FooterControl} from "../../../../controls/footer.control";
import {DiffusionInterface} from "../../../../interfaces/diffusion.interface";

@Component({
  selector: 'user-detail-tabs',
  template: `
<style>
.user-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  vertical-align: middle;
  /*position: absolute;
  top: 140px;
  left:50%;*/
  margin: auto;
  /*margin-left: -70px;*/
  -webkit-box-shadow: 2px 10px 23px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 2px 10px 23px -9px rgba(0,0,0,0.75);
  box-shadow: 2px 10px 23px -9px rgba(0,0,0,0.75);
}
</style>
<md-card>
  <md-card-header>
    <img md-card-avatar src="{{user.image.path}}" style="width: 72px; height: 72px; flex-shrink: 0;">
    <md-card-subtitle style="margin-top: 10px;">
      <p>{{user.description}}</p>
    </md-card-subtitle>
  </md-card-header>
  <md-card-actions>
    <button md-button class="pull-left"><md-icon>message</md-icon> Envíale mensaje</button>
    <button md-button class="pull-right" (click)="sendDiffusion();"><md-icon>comment</md-icon> Publicar</button>
    <div style="clear: both;"></div>
  </md-card-actions>
</md-card>

<md-tab-group #tabGroup>

  <md-tab>
    <ng-template md-tab-label >
      COMENTARIOS
    </ng-template>
    <user-comments [userId]="user.id"></user-comments>
  </md-tab>
  
  <md-tab>
    <ng-template md-tab-label>
      HORARIO
    </ng-template>
    <user-schedule [user]="user" [schedules]="schedules"></user-schedule>
  </md-tab>  
  
  <md-tab>
    <ng-template md-tab-label>
      SIGUIENDO
    </ng-template>
    <user-following [userId]="user.id"></user-following>
  </md-tab>
  
  <md-tab>
    <ng-template md-tab-label>
      SEGUIDORES
    </ng-template>
    <user-followers [userId]="user.id"></user-followers>
  </md-tab>
  
</md-tab-group>

`
})
export class UserDetailTabsComponent implements OnChanges{

  @Input()
  user: UserEntity;
  schedules: ScheduleEntity[];

  authUser: UserEntity = AuthService.User;
  @ViewChild('tabGroup') tabGroup;

  constructor(private postService: DiffusionLink, private scheduleService: ScheduleService, private footerControl: FooterControl, private publicationService: DiffusionLink){}

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.tabGroup.selectedIndex = 0;
    this.scheduleService.byUser(this.user.id).subscribe( resp => {
      this.schedules = resp;
    });

  }

  sendDiffusion(): void{
    this.publicationService.addDiffusionLink(<DiffusionInterface>{user: this.user});
  }
}
