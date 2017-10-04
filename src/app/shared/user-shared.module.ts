import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MaterialBaseModule} from "./material-base.module";
import {MdTabsModule} from '@angular/material';
import {MdListModule} from '@angular/material';

import {FollowActionDirective} from "../directives/follow-action-directive";
import {UserActionComponent} from "./components/user-action.component";
import {EditAuthDirective} from "../directives/edit-auth.directive";
import {ScheduleListComponent} from "./components/schedule-list.component";
import {SchedulesByDayPipe} from "./pipes/schedules-by-day.pipe";
import {LocationListComponent} from "./components/location-list.component";
import {LongClickDirective} from "../directives/long-click.directive";
import {UserListComponent} from "./components/user-list.component";
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [
    CommonModule,
    MaterialBaseModule,
    RouterModule,
    MdTabsModule,
    MdListModule
  ],
  declarations: [
    FollowActionDirective,
    EditAuthDirective,
    LongClickDirective,
    UserActionComponent,
    ScheduleListComponent,
    LocationListComponent,
    SchedulesByDayPipe,
    UserListComponent
  ],
  exports: [
    FollowActionDirective,
    EditAuthDirective,
    LongClickDirective,
    UserActionComponent,
    ScheduleListComponent,
    LocationListComponent,
    UserListComponent
  ]
})
export class UserSharedModule { }

