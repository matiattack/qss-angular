import {Component} from "@angular/core";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {Router} from "@angular/router";
import {RegistrationRequest} from "../../../shared/forms/registration.form";

@Component({
  selector: '',
  template:`
<md-card>
  <md-card-title-group>
    <md-card-title>Registro</md-card-title>
    <md-card-subtitle>Encuentra con quien compartir tus disciplinas deportivas favoritas</md-card-subtitle>
  </md-card-title-group>
  <md-card-content>
    <registration-form (registrationsubmit)="sendRegistry($event);"></registration-form>
  </md-card-content>
</md-card>

`
})
export class RegistrationComponent {

  constructor(private router: Router, private toolbarService: ToolbarService){}

  ngOnInit(): void {
    this.toolbarService.setRightButton({text: 'INGRESAR', icon: '', click: ()=>{
      this.router.navigate(['/login']);
    }});
  }

  sendRegistry(request: RegistrationRequest): void {
    console.log(request);
  }

}
