import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingImageComponent} from "./components/setting-image.component";
import {SettingAccountComponent} from "./components/setting-account.component";
import {SettingPasswordComponent} from "./components/setting-password.component";
import {SettingScheduleComponent} from "./components/setting-schedule.component";
import {SettingLocationComponent} from "./components/setting-location.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'account'},
    { path: 'account', component: SettingAccountComponent },
    { path: 'image', component: SettingImageComponent },
    { path: 'password', component: SettingPasswordComponent },
    { path: 'schedule', component: SettingScheduleComponent },
    { path: 'location', component: SettingLocationComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
