import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./modules/login/components/login.component";
import {RegistrationComponent} from "./modules/registration/components/registration.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'user', loadChildren: 'app/modules/user/user.module#UserModule' },
  { path: 'setting', loadChildren: 'app/modules/setting/setting.module#SettingModule'},
  { path: 'discipline', loadChildren: 'app/modules/discipline/discipline.module#DisciplineModule' },
  /*{ path: 'registration', loadChildren: 'app/modules/registration/registration.module#RegistrationModule' },
  { path: 'login', component: LoginComponent },*/
  { path: 'login', loadChildren: 'app/modules/login/login.module#LoginModule' },
  { path: 'publication', loadChildren: 'app/modules/publication/publication.module#PublicationModule' },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
