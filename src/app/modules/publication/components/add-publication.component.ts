import {Component, ViewContainerRef, Input, OnChanges, SimpleChanges, ElementRef, ViewChild} from "@angular/core";
import {Location} from '@angular/common';
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../shared/services/dialog.service";
import {UserDiffusionService} from "../../../services/user-diffusion.service";
import {UserDiffusionEntity} from "../../../entities/user-diffusion.entity";
import {DiffusionLink} from "../../../caches/diffusion.link";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {ToolbarInterface} from "../../../interfaces/toolbar.interface";
import {LinkDataInterface} from "../../../interfaces/link-data.interface";
import {ComponentContent} from "../../../interfaces/component-content.interface";
import {LocalImageInterface} from "../../../interfaces/local-image.interface";
import {ScheduleEntity} from "../../../entities/schedule.entity";
import {FooterControl} from "../../../controls/footer.control";
import {FooterSetting} from "../../../settings/footer.setting";
import {DisciplineEntity} from "../../../entities/discipline.entity";


@Component({
  selector: 'add-difusion',
  template: `

<div *ngIf="user != null || disciplines != null">
  <md-card [ngStyle]="{'min-height' : appHeight}">
  
    <!--<md-card-header>
      <img md-card-avatar src="{{authUser.image.path}}" style="width: 46px;flex-shrink: 0;">
      <md-card-title style="margin-top: 10px;">{{authUser.name}} {{authUser.lastName}}</md-card-title>
      <md-card-subtitle>{{this.commentText}}</md-card-subtitle>
    </md-card-header>-->
    
    <md-card-content>
    
      <md-input-container style="width: 100%;" floatPlaceholder="never">
        <textarea #commentTextElement mdInput mdTextareaAutosize [placeholder]="'Escribe algo'" [(ngModel)]="words"></textarea>
        <md-hint align="start" *ngIf="schedule != null" style="font-size: 14px;"><strong>En relación al horario {{schedule.start}} - {{schedule.end}}</strong> </md-hint>
      </md-input-container>
      
      <div *ngIf="image != null || link != null">
      
        <md-card>

          <div *ngIf="link != null">
            <md-card-header onclick="window.open(link.url, '_system');">
              <img md-card-avatar *ngIf="link.hasOwnProperty('image') && link.image != null" src="{{link.image}}" style="width: 72px; height: 72px; flex-shrink: 0;">
              <md-card-title style="margin-top: 10px;">{{link.title}}</md-card-title>
              <md-card-subtitle>{{link.description}}</md-card-subtitle>
            </md-card-header>
          </div>
          
          <div *ngIf="image != null" style="width: 100%;">
            <img md-card-image src="{{image.base64url}}"/>
          </div>
          
          <md-card-actions>
            <button md-mini-fab (click)="removeElements();" color="warn" class="pull-right"><md-icon>delete</md-icon></button>
            <div style="clear: both;"></div>
          </md-card-actions>
        </md-card>
        
      </div>  
      
    </md-card-content>
    
    <md-card-content *ngIf="disciplines != null && disciplines.length > 0">
      <md-chip-list>
        <md-chip *ngFor="let discipline of disciplines">{{discipline.name}}&nbsp;
          <button md-mini-fab><md-icon>delete</md-icon></button>
        </md-chip>
      </md-chip-list>
    </md-card-content>
    
    
    <md-card-actions *ngIf="image == null && link == null">
      <image-buttom (onselect)="setImage($event);" class="pull-left"></image-buttom>
      <button md-icon-button (click)="addLinkDialog();" class="pull-left">
        <md-icon>link</md-icon>
      </button>
      <button md-icon-button (click)="addDisciplineDialog();" class="pull-left">
        <md-icon>directions_run</md-icon>
      </button>
    </md-card-actions>
    
    
  
  </md-card>
</div>  
`
})
export class AddDiffusionComponent implements ComponentContent{

  //@ViewChild('commentTextElement') commentTextElement: ElementRef;

  user: UserEntity = this.publicationService.getDiffusionLinkData().user;
  schedule: ScheduleEntity =  this.publicationService.getDiffusionLinkData().schedule;
  disciplines: DisciplineEntity[] = this.publicationService.getDiffusionLinkData().disciplines;

  authUser: UserEntity = AuthService.User;

  link: LinkDataInterface;
  image: LocalImageInterface;
  words: string;
  appHeight: string;

  constructor(
    private commentService: UserDiffusionService,
    private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private publicationService: DiffusionLink,
    private toolbarService: ToolbarService,
    private location: Location,
    private footer: FooterControl){}

  setImage(image: LocalImageInterface){ this.image = image}

  ngOnInit(){
    this.setUiPresentation();
    this.setMessages();
  }

  sendComment(): void {

    let comment: UserDiffusionEntity = new UserDiffusionEntity(this.words, this.user, this.disciplines, this.link, this.image);
    this.commentService.save(comment).subscribe( resp => {
      this.location.back();
    });

  }

  addLinkDialog(): void {
    this.dialogService.prompt('AGREGAR UN ENLACE', 'Ingrese un enlace', 'http://', this.viewContainerRef).subscribe( uri => {
      if(uri.trim() != '' && uri.trim() != 'http://'){
        this.commentService.validateUri(uri).subscribe(resp => {
          this.link = resp;
          console.log(this.link);
        }, err => {
          console.log(err);
        });
      }
    });
  }

  addDisciplineDialog(): void {
    this.dialogService.disciplineSelect(this.viewContainerRef, this.disciplines).subscribe(resp => {
      this.disciplines = resp;
    });
  }

  removeElements(): void {
    this.link = null;
    this.image = null;
  }

  setUiPresentation(): void {

    ///this.footer.toggleFooter(FooterSetting.getInstance().DIFFUSION_MEDIA);

    let toolbarOptions: ToolbarInterface = this.toolbarService.defaultOptions;
    toolbarOptions.leftButton = {text: '', icon: 'clear', click: ()=>{ this.location.back() } };
    toolbarOptions.rightButton = {text: 'COMENTAR', icon: '', click: ()=>{ this.sendComment() }, color: 'primary' };
    toolbarOptions.color = '#ffffff';
    toolbarOptions.title = '';

    this.toolbarService.setToolbar(toolbarOptions);

  }

  setMessages(): void {

    this.appHeight = (window.screen.height - 56) + "px";
    //this.commentTextElement.nativeElement.focus();

  }


}

