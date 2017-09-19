import { Pipe, PipeTransform } from '@angular/core';
import {ScheduleEntity} from "../../entities/schedule.entity";

@Pipe({name: 'hasToday'})
export class HasTimeTodayPipe implements PipeTransform {

  transform(schedules: ScheduleEntity[], day: number): any {
    let filtered = schedules.filter(item => item.day == day);
    return filtered;
  }
}

