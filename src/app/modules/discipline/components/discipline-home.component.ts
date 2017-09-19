import {Component, ViewContainerRef} from "@angular/core";

import {DisciplineService} from "../../../services/discipline.service";
import {CategoryEntity} from "../../../entities/category.entity";
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {DisciplineEntity} from "../../../entities/discipline.entity";

@Component({
  template: `

<md-card>
  <md-card-title>Disciplinas</md-card-title>
  <md-card-subtitle>Busque disciplinas por su nombre o categoria para seguir todas las actividades relacionadas a ellas</md-card-subtitle>
  <discipline-filter [disciplines]="disciplines" ></discipline-filter>
</md-card>

<div *ngFor="let category of categories">
  <md-expansion-panel>
    <md-expansion-panel-header>
      <mat-panel-description>{{category.name}}</mat-panel-description>
    </md-expansion-panel-header>
    <div class="scrollmenu">
      <a routerLink="/discipline/{{discipline.id}}" class="scrollitem" *ngFor="let discipline of category.disciplines">
        <md-card>
          <md-card-header>
            <md-card-title>{{discipline.name}}</md-card-title>
          </md-card-header>
          <img md-card-image src="{{discipline.image.path}}">
          <md-card-footer>
            <button md-button class="full-width" (click)="whatTypeIs(discipline);">Click me!</button>
          </md-card-footer>
        </md-card>
      </a>
    </div>
  </md-expansion-panel>  
</div>
`
})
export class DisciplineHomeComponent {

  executing: boolean = false;
  categories: CategoryEntity[];

  constructor(private discipline: DisciplineService, private viewContainerRef: ViewContainerRef){ }

  ngOnInit(): void{
    console.log('ngOnInit');
    this.discipline.categories().subscribe( resp => {
      this.categories = resp;
    });
  }

  whatTypeIs(object: any){
    console.log(typeof object);
  }

  get disciplines(): DisciplineEntity[] {
    if(this.categories != null && this.categories.length > 0){
      return [].concat.apply([],
        this.categories.map(
          category => category.disciplines)
      );
    }
    return [];
  }

}
