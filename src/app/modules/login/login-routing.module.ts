import {LoginComponent} from "./components/login.component";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
