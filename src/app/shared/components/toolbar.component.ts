import {Component, EventEmitter, ChangeDetectorRef} from "@angular/core";
import {Output} from "@angular/core";
import {ToolbarService} from "../services/toolbar.service";
import {Observable} from 'rxjs/Observable';
import {ToolbarInterface} from "../../interfaces/toolbar.interface";

@Component({
  selector: 'app-toolbar',
  template: `
<style>
.app-toolbar {
  -webkit-box-shadow: -1px 10px 60px -20px rgba(0,0,0,0.75);
-moz-box-shadow: -1px 10px 60px -20px rgba(0,0,0,0.75);
box-shadow: -1px 10px 60px -20px rgba(0,0,0,0.75);
}
</style>
<div *ngIf="toolbar != null">
<md-toolbar-row>
<md-toolbar #appToolbar *ngIf="!toolbar.hidden"
[ngStyle]="{'background-color' : toolbar.color}"> 
  
  
  <div style="float: left; width: 15%;">
    <div *ngIf="!toolbar.hiddenLeftMenu">
      <button md-icon-button (click)="menuEmit()" *ngIf="toolbar.leftButton == null; else leftButton">
        <md-icon>view_headline</md-icon>
      </button>
      <ng-template #leftButton>
      
        <button md-icon-button (click)="toolbar.leftButton.click();">
          <md-icon *ngIf="toolbar.leftButton.icon.trim()!=''">{{toolbar.leftButton.icon}}</md-icon>
        </button>
        
      </ng-template>
    </div>
  </div>
  
  <div style="float: left; width: 55%;overflow: hidden;text-overflow: ellipsis; ">
    <span class="toolbar-title">{{toolbar.title.toUpperCase()}}</span>
  </div>
  
  <div style="float: left; width: 30%;text-align: right;">
    <button md-icon-button *ngIf="toolbar.menu.length > 0" [mdMenuTriggerFor]="moreMenu" class="pull-right">
      <md-icon>more_vert</md-icon>
    </button>
    
    <md-menu #moreMenu="mdMenu">
      <a md-menu-item *ngFor="let menu of toolbar.menu" [routerLink]="menu.url"> {{menu.name.toUpperCase()}} </a>
    </md-menu>
    
    <button md-raised-button *ngIf="toolbar.rightButton != null" (click)="toolbar.rightButton.click();" [color]="(toolbar.rightButton.color != null && toolbar.rightButton.color.trim()!='')?toolbar.rightButton.color:'default'">
      <span *ngIf="toolbar.rightButton.text.trim()!=''">{{toolbar.rightButton.text}} </span>
      <md-icon *ngIf="toolbar.rightButton.icon.trim()!=''">{{toolbar.rightButton.icon}}</md-icon>
    </button>
  </div>

        
</md-toolbar>
</md-toolbar-row>
</div>
`
})
export class ToolbarComponent {

  toolbar: ToolbarInterface;

  @Output()
  onMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private toolbarService: ToolbarService, private changeDetector: ChangeDetectorRef){}

  ngOnInit(): void {

    this.toolbarService.getToolbar().subscribe( toolbar => {
      this.toolbar = toolbar;
    })
  }

  menuEmit(): void {
    this.onMenu.emit(true);
  }

}
