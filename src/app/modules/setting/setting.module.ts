import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {MaterialBaseModule} from "../../shared/material-base.module";
import {MdListModule} from '@angular/material';
import {MdSnackBarModule} from '@angular/material';

import {SettingRoutingModule} from "./setting-routing.module";
import {SettingImageComponent} from "./components/setting-image.component";
import {DialogService} from "../../shared/services/dialog.service";
import {MdMenuModule} from '@angular/material';
import {ImageService} from "../../services/http/image.service";
import {SharedBaseModule} from "../../shared/shared-base.module";
import {SettingAccountComponent} from "./components/setting-account.component";
import {UserSharedModule} from "../../shared/user-shared.module";
import {SettingPasswordComponent} from "./components/setting-password.component";
import {SettingScheduleComponent} from "./components/setting-schedule.component";
import {ScheduleService} from "../../services/http/schedule.service";
import {ScheduleFormComponent} from "../../shared/forms/schedule.form";
import {SettingLocationComponent} from "./components/setting-location.component";
import {GoogleMapModule} from "../../shared/google-map.module";
import {LocationService} from "../../services/http/location.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SettingRoutingModule,
    MaterialBaseModule,
    SharedBaseModule,
    UserSharedModule,
    GoogleMapModule,
    MdListModule,
    MdMenuModule,
    MdSnackBarModule
  ],
  declarations: [
    SettingImageComponent,
    SettingAccountComponent,
    SettingPasswordComponent,
    SettingScheduleComponent,
    ScheduleFormComponent,
    SettingLocationComponent
  ],
  providers: [
    DialogService,
    ImageService,
    ScheduleService,
    LocationService
  ]
})
export class SettingModule { }
