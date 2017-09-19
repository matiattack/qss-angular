import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {DisciplineEntity} from "../../../entities/discipline.entity";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'discipline-dialog',
  template: `
<h2 md-dialog-title>Seleccione disciplinas</h2>

<md-dialog-content>
  
  <md-list>
    <md-list-item *ngFor="let discipline of disciplines">
      <md-checkbox 
      [checked]="isInArray(discipline)" 
      (change)="interaction(discipline, $event.checked);">
        {{discipline.name}}</md-checkbox>
    </md-list-item>
  </md-list>
  
</md-dialog-content>

<button type="button" md-button color="primary" class="pull-right"
    (click)="dialogRef.close(selected)">LISTO</button>
<button type="button" md-button class="pull-right" 
    (click)="dialogRef.close(null)">CANCELAR</button>
<div style="clear: both;"></div>
`
})
export class DisciplineDialogComponent {

  constructor(public dialogRef: MdDialogRef<DisciplineDialogComponent>) { }

  disciplines: DisciplineEntity[] = AuthService.User.disciplines;
  public selected: DisciplineEntity[] = [];

  interaction(discipline: DisciplineEntity, selected: boolean): void {
    if(selected){
      this.selected.push(discipline);
    }else{
      for(let i: number = 0; i<this.selected.length; i++){
        if(this.selected[i].id == discipline.id){
          this.selected.splice(i, 1);
          break;
        }
      }
    }
  }

  isInArray(discipline: DisciplineEntity): boolean {
    for(let i: number = 0; i<this.selected.length; i++){
      if(this.selected[i].id == discipline.id){
        return true;
      }
    }
    return false;
  }

}
