import {NgModule} from "@angular/core";
import {MdTabsModule} from "@angular/material";
import {SharedBaseModule} from "../../shared/shared-base.module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AddEventComponent} from "./components/add-event.component";
import {EventRountingModule} from "./event-routing.moduele";
import {MdExpansionModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';
import {GoogleMapModule} from "../../shared/google-map.module";
import {MdGridListModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedBaseModule,
    MdTabsModule,
    EventRountingModule,
    MdExpansionModule,
    MdChipsModule,
    GoogleMapModule,
    MdGridListModule
  ],
  declarations: [
    AddEventComponent
  ]
})
export class EventModule {}
