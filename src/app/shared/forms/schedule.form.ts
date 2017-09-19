import {Component, Output, EventEmitter} from "@angular/core";
import {FormControlService} from "../services/form-control.service";
import {FormGroup} from "@angular/forms";
import {ScheduleEntity} from "../../entities/schedule.entity";
import {Input} from "@angular/core";
import {ScheduleService, Day} from "../../services/schedule.service";

@Component({
  selector: 'schedule-form',
  template: `
<form [formGroup]="scheduleFormControl" novalidate (submit)="sendSchedule(scheduleFormControl.value);">
  <md-select placeholder="Seleccione un día de la semana" class="full-width" #dayOfWeek formControlName="day">
      <md-option *ngFor="let day of days" [value]="day.value">
        {{ day.name }}
      </md-option>
    </md-select>
    <md-error *ngIf="scheduleFormControl.get('day').hasError('required')">
      Debe seleccionar un día
    </md-error>
      
    <table cellspacing="0" width="100%">
      <tr>
        <td width="50%">
          <md-input-container
          [style.width]="'100%'">
            <input mdInput placeholder="Desde" #start formControlName="start">
            <md-error *ngIf="scheduleFormControl.get('start').hasError('pattern')">
              Ingrese una hora válida
            </md-error>
          </md-input-container>
        </td>
        <td width="50%">
          <md-input-container 
          [style.width]="'100%'">
            <input mdInput placeholder="Hasta" #end formControlName="end">
            <md-error *ngIf="scheduleFormControl.get('end').hasError('pattern')">
              Ingrese una hora válida
            </md-error>
          </md-input-container>
        </td>
      </tr>
    </table>
    <md-error *ngIf="scheduleFormControl.errors?.startAndEndHour">
      La hora de término debe ser mayor a la de inicio
    </md-error>
    <br/>
    <button md-raised-button color="primary" type="submit" class="pull-right" [disabled]="!scheduleFormControl.valid">GUARDAR</button>
    <button md-button color="primary" type="button" class="pull-right" (click)="schedulecancel.emit(false);">CANCELAR</button>
    <div style="clear: both;"></div>
</form>
`
})
export class ScheduleFormComponent {

  @Input()
  schedule: ScheduleEntity;

  @Output()
  schedulesubmit: EventEmitter<ScheduleEntity> = new EventEmitter<ScheduleEntity>();

  @Output()
  schedulecancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  scheduleFormControl: FormGroup;
  days: Day[] = ScheduleService.days();

  constructor(private formControlService: FormControlService){}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    if(this.schedule != null){
      this.scheduleFormControl = this.formControlService.scheduleFormControl(this.schedule.day, this.schedule.start, this.schedule.end);
    }else this.scheduleFormControl = this.formControlService.scheduleFormControl();
  }

  sendSchedule(data: any): void {
    this.schedulesubmit.emit(new ScheduleEntity(data.day, data.start, data.end));
  }

}
