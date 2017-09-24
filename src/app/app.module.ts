import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
/**
 * App Components
 */
import {AppComponent} from './app.component';
import {AuthGuard} from "./guards/auth.guard";
import {HomeModule} from "./modules/home/home.module";
import {LoginComponent} from "./modules/login/components/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth.service";
import {SharedBaseModule} from "./shared/shared-base.module";
import {ToolbarService} from "./shared/services/toolbar.service";
import {ToolbarComponent} from "./shared/components/toolbar.component";
import {FormControlService} from "./shared/services/form-control.service";
import {DiffusionLink} from "./caches/diffusion.link";
import {UserDiffusionService} from "./services/http/user-diffusion.service";
import {AddDiffusionComponent} from "./modules/publication/components/add-publication.component";
import {UserService} from "./services/http/user.service";
import {DialogService} from "./shared/services/dialog.service";
import {RegistrationComponent} from "./modules/registration/components/registration.component";
import {RegistrationFormComponent} from "./shared/forms/registration.form";
import {FooterComponent} from "./shared/components/footer.component";
import {FooterControl} from "./controls/footer.control";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    RegistrationFormComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    SharedBaseModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    ToolbarService,
    FormControlService,
    DiffusionLink,
    UserDiffusionService,
    UserService,
    DialogService,
    FooterControl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
