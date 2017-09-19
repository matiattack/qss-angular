import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {HomeComponent} from "./components/home.component";
import {AuthGuard} from "../../guards/auth.guard";


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
