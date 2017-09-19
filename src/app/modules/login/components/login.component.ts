import {Component} from "@angular/core";
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {ToolbarService} from "../../../shared/services/toolbar.service";

@Component({
  template: `
<md-card>
  <md-card-title>Inicie sesión</md-card-title>
  <md-card-content>
    
    <md-input-container class="full-width">
      <input mdInput placeholder="Ingrese su nombre de usuario" #username>
    </md-input-container>
    
    <md-input-container class="full-width">
      <input mdInput placeholder="Ingrese su password" type="password" #password>
    </md-input-container>

    <button md-raised-button color="primary"
      (click)="login(username.value, password.value)"
      [disabled]="executing">INGRESAR
    </button>
        
  </md-card-content>
</md-card>
`
})
export class LoginComponent {

  executing: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toolbarService: ToolbarService){}

  ngOnInit(): void {
    console.log('this.toolbarService.hiddeToolbar();');
    this.toolbarService.hiddeToolbar();
  }

  login(username: string, password: string): void {
    this.executing = true;
    this.authService.login(username, password).subscribe(response => {
      this.authService.authenticate().subscribe( authResp => {
        this.router.navigate(['/']);
      }, err => {console.log(err);});
    });

  }

}
