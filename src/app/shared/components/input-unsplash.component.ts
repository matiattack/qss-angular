import {Component, EventEmitter, Output} from "@angular/core";
import {UnsplashResponse} from "../../services/http/response/unsplash.response";
import {UnsplashService} from "../../services/http/unsplash.service";
import {PageEvent} from "@angular/material";
import {UnsplashEntity} from "../../entities/unsplash.entity";

@Component({
  selector: 'input-unsplash',
  template: `
<table width="100%">
  <tr>
    <td width="80%">
      <md-input-container style="width: 100%;">
        <input type="text" mdInput placeholder="Ingrese una palabra para buscar imagenes" [(ngModel)]="keyword">
      </md-input-container>
    </td>
    <td width="20%">
      <button md-mini-fab class="pull-right" (click)="search();"><md-icon>search</md-icon></button>
    </td>
  </tr>
</table>

<md-progress-bar mode="indeterminate" *ngIf="searching"></md-progress-bar>

<div *ngIf="query != null">
  
  <md-paginator [length]="query.total"
                [pageSizeOptions]="[6]"
                (page)="nextPage($event)">
  </md-paginator>
  
  <span>{{query.total}} resultados encontrados</span>
  <md-grid-list cols="2" rowHeight="1:1">
    <md-grid-tile *ngFor="let unsplash of query.data">
      <a (click)="select(unsplash)"><img src="{{unsplash.image.small}}"></a>
    </md-grid-tile>
  </md-grid-list>
</div>
`
})
export class InputUnsplashComponent {

  query: UnsplashResponse = null;
  keyword: string = '';
  pageIndex: number = 0;
  searching: boolean = false;
  @Output() unsplashselect: EventEmitter<UnsplashEntity> = new EventEmitter<UnsplashEntity>();

  constructor(private unsplashService: UnsplashService){}

  nextPage(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.search();
  }

  search(): void {
    this.searching = true;
    this.unsplashService.getByKeyWord(this.keyword, (this.pageIndex+1)).subscribe(response => {
      this.searching = false;
      this.query = response;
    });
  }

  select(image: UnsplashEntity): void {
    this.unsplashselect.emit(image);
  }

}
