import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SharedBaseModule} from "../../shared/shared-base.module";

import {PublicationRoutingModule} from "./publication-routing.module";
import {PublicationDetailComponent} from "./components/publication-detail.component";
import {AddDiffusionComponent} from "./components/add-publication.component";
import {MdChipsModule, MdTabsModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    PublicationRoutingModule,
    SharedBaseModule,
    MdTabsModule
  ],
  declarations: [
    PublicationDetailComponent,
    AddDiffusionComponent
  ],
  providers:    [  ]
})
export class PublicationModule {}
