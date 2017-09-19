import {Pipe, PipeTransform} from '@angular/core';
import {ScheduleEntity} from "../../entities/schedule.entity";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({name: 'safeStyle'})
export class SafeStylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(style): any {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

