import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {UserEntity} from "../../../../entities/user.entity";
import {AuthService} from "../../../../services/auth.service";
import {ScheduleEntity} from "../../../../entities/schedule.entity";
import {ScheduleService, Day} from "../../../../services/schedule.service";
import {SchedulesByDayPipe} from "../../../../shared/pipes/schedules-by-day.pipe";
import {DiffusionLink} from "../../../../caches/diffusion.link";

@Component({
  selector: 'user-schedule',
  template:`
<md-card>
  <md-card-subtitle>Manten presionado un horario para preguntar por el</md-card-subtitle>
  <md-card-content>
    <div *ngIf="this.schedules!= null && this.schedules.length > 0; else notHasSchedule">
      <schedule-list [schedules]="schedules" [canSelect]="false" (schedulepressed)="diffuseSchedule($event)"></schedule-list>       
    </div>
    <ng-template #notHasSchedule>
      <md-chip-list>
        <md-chip color="primary">{{user.name}} aún no ha agregado horarios, invitalo o preguntale cuando estara disponible!!
        <br>
        <button  md-mini-fab class="pull-right" color="warn"><md-icon>check</md-icon></button>
        </md-chip>
      </md-chip-list>
    </ng-template>
  </md-card-content>
</md-card>
`
})
export class UserScheduleComponent implements OnChanges{

  @Input()
  user: UserEntity;
  @Input()
  schedules: ScheduleEntity[];

  days: Day[] = ScheduleService.days();
  authUser: UserEntity = AuthService.User;

  constructor(private postService: DiffusionLink){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.schedules != null && this.schedules.length > 0){
      this.days.forEach((day, index) => {
        day.schedules = new SchedulesByDayPipe().transform(this.schedules, day.value);
      });
    }
  }

  diffuseSchedule(schedule: ScheduleEntity): void {
    this.postService.addDiffusionLink({user: this.user, schedule: schedule})
  }

}
