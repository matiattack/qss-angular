import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {FormControlService} from "../services/form-control.service";
import {UserEntity} from "../../entities/user.entity";

export interface RegistrationRequest {
  user: UserEntity;
  password: string;
}

@Component({
  'selector': 'registration-form',
  template: `
<form [formGroup]="formControl" novalidate (submit)="sendRegistration(formControl.value);">

<table width="100%">
  <tr>
    <td width="50%">
      <md-input-container
      [style.width]="'100%'">
        <input mdInput placeholder="Nombre" #name formControlName="name">
        <md-error *ngIf="formControl.get('name').hasError('required')">
         Debe Ingresar un nombre
        </md-error>
      </md-input-container>
    </td>
    
    <td>
      <md-input-container
      [style.width]="'100%'">
        <input mdInput placeholder="Apellidos" #lastName formControlName="lastName">
        <md-error *ngIf="formControl.get('lastName').hasError('required')">
          Debe ingresar un apellido
        </md-error>
      </md-input-container>
    </td>
    
  </tr>
</table>

<md-input-container
[style.width]="'100%'">
  <input mdInput placeholder="Correo" #email formControlName="email">
  <md-error *ngIf="formControl.get('email').hasError('required')">
    Ingrese un correo válido
  </md-error>
</md-input-container>

<md-input-container
[style.width]="'100%'">
  <input mdInput placeholder="Contraseña" #password formControlName="password">
  <md-error *ngIf="formControl.get('password').hasError('required')">
    Ingrese una contraseña
  </md-error>
</md-input-container>

<button md-raised-button color="primary" type="submit" class="pull-right" [disabled]="!formControl.valid">CONTINUAR </button>
<div style="clear: both;"></div>

</form>
`
})
export class RegistrationFormComponent {

  @Output()
  registrationsubmit: EventEmitter<RegistrationRequest> = new EventEmitter<RegistrationRequest>();

  formControl: FormGroup;

  constructor(private formControlService: FormControlService){}

  ngOnInit(): void {
    this.formControl = this.formControlService.registrationFormControl();
  }

  sendRegistration(data: any): void {
    this.registrationsubmit.emit({
      user: new UserEntity(data.name, data.lastName, data.email),
      password: data.password
    });
  }

}
