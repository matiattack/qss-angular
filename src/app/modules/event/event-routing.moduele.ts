import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddEventComponent} from "./components/add-event.component";

const appRoutes: Routes = [
  { path: 'add', component: AddEventComponent},
  //{ path: ':id', component: }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class EventRountingModule {}
