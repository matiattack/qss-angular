import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {RegistrationComponent} from "./components/registration.component";

const appRoutes: Routes = [
  { path: '', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}

