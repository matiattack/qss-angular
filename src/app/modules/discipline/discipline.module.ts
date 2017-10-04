import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {MdAutocompleteModule, MdTabsModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';

import {DisciplineRoutingModule} from "./discipline-routing.module";
import {DisciplineHomeComponent} from "./components/discipline-home.component";
import {MaterialBaseModule} from "../../shared/material-base.module";
import {DisciplineService} from "../../services/http/discipline.service";
import {DisciplineDetailComponent} from "./components/discipline-detail.component";
import {DisciplineFilterComponent} from "./components/discipline-home/discipline-filter.component";
import {DisciplineDetailTabsComponent} from "./components/discipline-detail/discipline-detail-tabs.component";
import {DisciplineFollowersComponent} from "./components/discipline-detail/discipline-followers.component";
import {DisciplinePublicationsComponent} from "./components/discipline-detail/discipline-publications.component";
import {SharedBaseModule} from "../../shared/shared-base.module";
import {UserSharedModule} from "../../shared/user-shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialBaseModule,
    DisciplineRoutingModule,
    MdAutocompleteModule,
    MdSelectModule,
    MdChipsModule,
    SharedBaseModule,
    UserSharedModule,
    MdTabsModule
  ],
  declarations: [
    DisciplineHomeComponent,
    DisciplineDetailComponent,
    DisciplineFilterComponent,
    DisciplineDetailTabsComponent,
    DisciplineFollowersComponent,
    DisciplinePublicationsComponent
  ],
  providers: [
    DisciplineService
  ],
  entryComponents: []
})
export class DisciplineModule { }
