import {Component, ViewContainerRef} from "@angular/core";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ScheduleService, Day} from "../../../services/schedule.service";
import {ScheduleEntity} from "../../../entities/schedule.entity";
import {DialogService} from "../../../shared/services/dialog.service";
import {ToolbarService} from "../../../shared/services/toolbar.service";

interface ActionSchedule {
  toEdit: ScheduleEntity;
  toDelete: ScheduleEntity[];
}

@Component({
  selector: 'setting-schedule',
  template: `
<style>
  .actual-image {
    width: 160px; height: 160px; border-radius: 50%; margin: auto; 
    background-repeat: no-repeat; background-size: cover;
  }
</style>
<div *ngIf="!isEditing; else editPanel">
<md-expansion-panel #myPanel *ngIf="!isSelecting">
  <md-expansion-panel-header>
    <mat-panel-description>AGREGAR UN NUEVO HORARIO</mat-panel-description>
    <!--<mat-panel-title><md-icon md-list-icon>schedule</md-icon></mat-panel-title>-->
  </md-expansion-panel-header>
  <schedule-form (schedulesubmit)="addSchedule($event); myPanel.expanded = false;" (schedulecancel)="cancelForm(); myPanel.expanded = false;"></schedule-form>  
</md-expansion-panel>

<schedule-list *ngIf="schedules.length > 0" [schedules]="schedules" (scheduleselect)="whenSelectSchedules($event);" (schedulepressed)="whenSelectToEdit($event)"></schedule-list>
</div>

<ng-template #editPanel>
  <md-card>
    <md-card-subtitle style="margin-bottom: 20px;">
      EDITAR HORARIO
    </md-card-subtitle>
    <md-card-content>
      <schedule-form (schedulesubmit)="editSchedule($event);" [schedule]="actionsForThese.toEdit" (schedulecancel)="cancelForm();" ></schedule-form>
    </md-card-content>
    
  </md-card>
</ng-template>
`
})
export class SettingScheduleComponent {

  user: UserEntity = AuthService.User;
  schedules: ScheduleEntity[] = [];
  actionsForThese: ActionSchedule = {toEdit: null, toDelete: []};

  isSelecting: boolean = false;
  isEditing: boolean = false;

  constructor(private scheduleService: ScheduleService, private dialogService: DialogService, private viewContainerRef: ViewContainerRef, private toolbarService: ToolbarService){}

  ngOnInit(): void {
    this.scheduleService.byUser(this.user.id).subscribe( resp => {
      this.schedules = resp;
    });
  }

  addSchedule(schedule: ScheduleEntity): void {
    this.scheduleService.save(schedule).subscribe( resp => {
      if(resp instanceof ScheduleEntity){
        this.schedules.push(resp);
      }
    });
  }

  deleteSchedules(): void {

    let titleMessage: string = 'Eliminar horario(s)';
    let subtitleMessage: string = '¿Seguro desea elminiar el o los horarios?';
    let deleteButtonMessage: string = 'ELIMINAR';
    let cancelButtonMessage: string = 'CANCELAR';

    this.dialogService.confirm(titleMessage, subtitleMessage, deleteButtonMessage, cancelButtonMessage, this.viewContainerRef).subscribe(confirmResp => {

      if(confirmResp){
        let ids: number[] = this.actionsForThese.toDelete.map(item => item.id);
        this.scheduleService.destroy(ids).subscribe( r =>{

          let cleanArray: ScheduleEntity[] = [];
          for(let i: number = 0; i<this.schedules.length; i++){
            if(!(ids.indexOf(this.schedules[i].id) > -1)){
              cleanArray.push(this.schedules[i]);
            }
          }

          this.schedules = cleanArray;
          this.isSelecting = false;
          this.toolbarService.setDefault();
          this.actionsForThese.toDelete = [];

        });
      }

    });

  }

  editSchedule(schedule: ScheduleEntity): void {

    let titleMessage: string = 'Cambiar horario';
    let subtitleMessage: string = '¿Seguro desea actualizar este elemento?';
    let deleteButtonMessage: string = 'CONSERVAR CAMBIOS';
    let cancelButtonMessage: string = 'CANCELAR';

    this.dialogService.confirm(titleMessage, subtitleMessage, deleteButtonMessage, cancelButtonMessage, this.viewContainerRef).subscribe(confirmResp => {
      if(confirmResp){
        this.scheduleService.update(schedule, this.actionsForThese.toEdit.id).subscribe( editResponse => {
          if(editResponse instanceof ScheduleEntity){
            for(let i: number = 0; i<this.schedules.length; i++){
              if(this.schedules[i].id == editResponse.id){
                this.schedules[i] = editResponse;
                this.cancelForm();
                break;
              }
            }
          }
        });
      }
    });
  }

  whenSelectSchedules(elements: ScheduleEntity[]): void {
    if(elements.length > 0){
      this.isSelecting = true;
      this.actionsForThese.toDelete = elements;
      this.toolbarService.setRightButton({text: 'ELIMINAR', icon: '', click: () => {
        this.deleteSchedules();
      }});
    }else {
      this.isSelecting = false;
      this.toolbarService.setDefault();
    }
  }

  whenSelectToEdit(schedule: ScheduleEntity): void {
    this.isEditing = true;
    this.actionsForThese.toEdit = schedule;
  }

  cancelForm(): void {
    this.actionsForThese = {toEdit: null, toDelete: []};
    this.isEditing = false;
  }

}
