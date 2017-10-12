import {NgModule} from "@angular/core";
import {MdTabsModule} from "@angular/material";
import {SharedBaseModule} from "../../shared/shared-base.module";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AddEventComponent} from "./components/add-event.component";
import {EventRountingModule} from "./event-routing.moduele";
import {MdExpansionModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';
import {GoogleMapModule} from "../../shared/google-map.module";
import {MdGridListModule} from '@angular/material';
import {MdPaginatorModule} from '@angular/material';
import {MdRadioModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';

import {InputUnsplashComponent} from "../../shared/components/input-unsplash.component";
import {EventService} from "../../services/http/event.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedBaseModule,
    MdTabsModule,
    EventRountingModule,
    MdExpansionModule,
    MdChipsModule,
    GoogleMapModule,
    MdGridListModule,
    MdPaginatorModule,
    MdRadioModule,
    MdProgressBarModule
  ],
  declarations: [
    AddEventComponent,
    InputUnsplashComponent
  ],
  providers: [
    EventService
  ]
})
export class EventModule {}
