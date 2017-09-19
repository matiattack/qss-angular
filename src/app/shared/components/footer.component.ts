import {Component, Input} from "@angular/core";
import {FooterSetting} from "../../settings/footer.setting";
import {FooterInterface} from "../../interfaces/footer.interface";
import {AuthService} from "../../services/auth.service";
import {DiffusionLink} from "../../caches/diffusion.link";
import {UserEntity} from "../../entities/user.entity";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-footer',
  animations: [
    trigger('increase', [
      state('inactive', style({
        transform: 'scale(0)'
      })),
      state('active',   style({
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  template: `
<div *ngIf="footer != null">
  <div [ngSwitch]="footer.type">
    <ng-template [ngSwitchCase]="settings.ADD_COMMENT">
        
        <md-card style="background-color: #F5F5F5; padding-top: 0px; padding-bottom: 0px; position: fixed; left: 0px; bottom: 0px; width: 95%; border-top: solid 1px #dddddd">   
          <md-card-content>
            <table width="100%">
              <tr>
                <td width="80%">
                  <md-input-container style="width: 100%;" floatPlaceholder="never">
                    <textarea #commentTextElement mdInput mdTextareaAutosize placeholder="Ingresa un comentario"></textarea>
                  </md-input-container>
                </td>
                <td width="20%">
                  <button md-button class="pull-right" (click)="addComment(commentTextElement.value)">COMENTAR</button>
                </td>
              </tr>
            </table>
          </md-card-content>
        </md-card>
        
    </ng-template>
    
    <ng-template [ngSwitchCase]="settings.ADD_DIFFUSION">
      <div style="padding-right: 10px; padding-bottom: 20px;">
        <button md-fab (click)="addDiffusion();" class="pull-right" [@increase]="state"><md-icon>check</md-icon></button>
      </div>
    </ng-template>
    
  </div>
</div>
`
})
export class FooterComponent{

  @Input() footer: FooterInterface;
  settings = FooterSetting.getInstance();
  authUser: UserEntity = AuthService.User;
  state: string = 'inactive';


  constructor(private publicationControl: DiffusionLink){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('ngAfterViewInit');
      this.state = 'active';
    }, 100);
  }

  addDiffusion(): void {
    this.publicationControl.addDiffusionLink({user: this.authUser, schedule: null});
  }

  addComment(comment: string): void {
    this.publicationControl.addComment(comment);
  }

}
