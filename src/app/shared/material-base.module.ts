import {NgModule} from "@angular/core";
import {MdDialogModule, MdButtonModule, MdToolbarModule, MdSidenavModule, MdNativeDateModule} from "@angular/material";
import {MdCardModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdCheckboxModule} from '@angular/material';
import {MdAutocompleteModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdExpansionModule} from '@angular/material';
import {MdSlideToggleModule} from '@angular/material';
import {MdDatepickerModule} from '@angular/material';
import {MdListModule} from '@angular/material';


@NgModule({
  imports: [
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdProgressBarModule,
    MdSelectModule,
    MdExpansionModule,
    MdSlideToggleModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdListModule
  ],
  exports: [
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdMenuModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdProgressBarModule,
    MdSelectModule,
    MdExpansionModule,
    MdSlideToggleModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdListModule
  ]
})
export class MaterialBaseModule { }

