import {Component, Input, DoCheck, Output, EventEmitter} from "@angular/core";
import {ScheduleEntity} from "../../entities/schedule.entity";
import {ScheduleService, Day} from "../../services/schedule.service";
import {SchedulesByDayPipe} from "../pipes/schedules-by-day.pipe";
import {DiffusionLink} from "../../caches/diffusion.link";

@Component({
  selector: 'schedule-list',
  template: `
<md-nav-list>
  <div *ngFor="let day of days">
    <div *ngIf="day.schedules.length > 0">
      <h3 md-subheader>{{day.name}}</h3>
      <md-list-item *ngFor="let schedule of day.schedules" longClick (onlongclick)="prepareToPressed(schedule);">
        <md-checkbox md-list-icon (change)="interaction(schedule, $event.checked);" *ngIf="canSelect"></md-checkbox>
        <h4 md-line>{{schedule.start}} - {{schedule.end}}</h4>
      </md-list-item>
      <md-divider></md-divider>
    </div>
  </div>
</md-nav-list>
`
})
export class ScheduleListComponent implements DoCheck {

  @Input() schedules: ScheduleEntity[];
  @Input() canSelect: boolean = true;

  days: Day[] = ScheduleService.days();

  @Output()
  scheduleselect: EventEmitter<ScheduleEntity[]> = new EventEmitter<ScheduleEntity[]>();
  @Output()
  schedulepressed: EventEmitter<ScheduleEntity> = new EventEmitter<ScheduleEntity>();
  schedulesSelected: ScheduleEntity[] = [];

  ngDoCheck(): void {
    this.days.forEach((day, index) => {
      day.schedules = new SchedulesByDayPipe().transform(this.schedules, day.value);
    });
  }

  interaction(schedule: ScheduleEntity, selected: boolean): void {
    if(selected){
      this.schedulesSelected.push(schedule);
    }else {
      for(let i: number = 0; i<this.schedulesSelected.length; i++){
        if(this.schedulesSelected[i].id == schedule.id){
          this.schedulesSelected.splice(i, 1);
          break;
        }
      }
    }
    this.scheduleselect.emit(this.schedulesSelected);
  }

  prepareToPressed(schedule: ScheduleEntity): void {
    this.schedulepressed.emit(schedule);
  }

}
