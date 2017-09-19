import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {PublicationDetailComponent} from "./components/publication-detail.component";
import {AddDiffusionComponent} from "./components/add-publication.component";

const appRoutes: Routes = [
  { path: 'add', component: AddDiffusionComponent},
  { path: ':id', component: PublicationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule {}

