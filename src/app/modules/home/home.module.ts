import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MdTabsModule} from '@angular/material';

import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {MaterialBaseModule} from "../../shared/material-base.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HomeRoutingModule,
    MaterialBaseModule,
    MdTabsModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
  ]
})
export class HomeModule { }
