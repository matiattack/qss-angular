import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {LoginComponent} from "./components/login.component";
import {LoginRoutingModule} from "./login-routing.module";
import {MaterialBaseModule} from "../../shared/material-base.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    MaterialBaseModule
  ],
  declarations: [
    LoginComponent
  ],
  providers:    [  ]
})
export class LoginModule { }
