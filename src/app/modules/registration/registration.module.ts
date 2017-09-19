import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialBaseModule} from "../../shared/material-base.module";
import {RegistrationComponent} from "./components/registration.component";
import {RegistrationRoutingModule} from "./registration-routing";
import {RegistrationFormComponent} from "../../shared/forms/registration.form";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RegistrationRoutingModule,
    MaterialBaseModule
  ],
  declarations: [
    RegistrationComponent,
    RegistrationFormComponent
  ],
  providers:    [  ]
})
export class RegistrationModule {}
