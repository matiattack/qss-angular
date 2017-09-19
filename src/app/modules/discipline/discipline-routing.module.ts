import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "../../guards/auth.guard";
import {NgModule} from "@angular/core";

import {DisciplineHomeComponent} from "./components/discipline-home.component";
import {DisciplineDetailComponent} from "./components/discipline-detail.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DisciplineHomeComponent },
  { path: ':id', component: DisciplineDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DisciplineRoutingModule {}
