import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {DisciplineEntity} from "../../../../entities/discipline.entity";

@Component({
  selector: 'discipline-filter',
  template: `
<div *ngIf="disciplines.length > 0" >
  <md-form-field [style.width]="'100%'">
    <span mdPrefix><md-icon>search</md-icon> &nbsp;</span>
    <input mdInput placeholder="Busque una disciplina aqui" aria-label="State" [mdAutocomplete]="auto" [formControl]="disciplineCtrl">
    <md-autocomplete #auto="mdAutocomplete" [displayWith]="displayFn">
    
      <md-option *ngFor="let discipline of filteredDisciplines | async" [value]="discipline">
        <img style="vertical-align:middle;" aria-hidden src="{{discipline.image.path}}" height="25" width="25" />
        <span>{{ discipline.name }}</span> |
        <small>Seguidores: 3</small>
      </md-option>
      
    </md-autocomplete>
  </md-form-field>
</div>
`
})
export class DisciplineFilterComponent {


  @Input() disciplines: DisciplineEntity[] = [];

  disciplineCtrl: FormControl;
  filteredDisciplines: Observable<DisciplineEntity[]>;

  constructor(){

    this.disciplineCtrl = new FormControl();
    this.filteredDisciplines = this.disciplineCtrl.valueChanges
      .startWith(null)
      .map(name => name ? this.filterDisciplines(name) : this.topFiveStates());

  }

  filterDisciplines(name: string) {
    console.log('filterDisciplines', name);
    return this.disciplines.filter(discipline =>
    discipline.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  topFiveStates() {
    return this.disciplines.slice(0, 5);
  }

  displayFn(discipline: DisciplineEntity): string {
    return discipline ? discipline.name : '';
  }

}
