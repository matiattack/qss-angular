import {NgModule} from "@angular/core";
import {AddressPredictionDirective} from "../directives/address-prediction.directive";
import {InputAddressComponent} from "./components/input-address.component";
import {CommonModule} from "@angular/common";
import {MaterialBaseModule} from "./material-base.module";
import {MdListModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MaterialBaseModule
  ],
  declarations: [
    InputAddressComponent,
    AddressPredictionDirective
  ],
  exports: [
    InputAddressComponent,
    AddressPredictionDirective
  ]
})
export class GoogleMapModule {}
