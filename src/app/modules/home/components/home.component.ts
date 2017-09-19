import {Component} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {DiffusionLink} from "../../../caches/diffusion.link";
import {FooterSetting} from "../../../settings/footer.setting";
import {FooterControl} from "../../../controls/footer.control";
import {DiffusionInterface} from "../../../interfaces/diffusion.interface";

@Component({
  template: `
<style>
  .home-user-actions {
    width: 50%;
    float: left;La incertidumbre del entorno es mayor en cuanto el ritmo de innovación de productos aumenta, hay que adaptarse en el menor tiempo posible.
  }
</style>
<md-card>
  <md-card-actions>
    <button md-raised-button (click)="addDiffusion();">Publicar algo...</button>
  </md-card-actions>
  
  <md-card-footer class="home-user-footer-actions">
    <button md-button class="home-user-actions">Click me!</button>
    <button md-button class="home-user-actions">Click me!</button>
  </md-card-footer>
</md-card>
<h1 class="mat-display-1">Jackdaws love my big sphinx of quartz.</h1>
<h2 class="mat-h2">The quick brown fox jumps over the lazy dog.</h2>

<!-- By default, Angular Material applies no global styles to native elements. -->
<h1>This header is unstyled</h1>

<!-- Applying the mat-tyography class adds styles for native elements. -->
<section class="mat-typography">
  <h1>This header will be styled</h1>
</section>
`
})
export class HomeComponent {

  greeting: string;

  constructor(
    private toolbarService: ToolbarService,
    private publicationService: DiffusionLink,
    private footerControl: FooterControl){}

  ngOnInit() {

    let greetings = ['Bonjour', 'Hola', 'Hello', 'Hallo', 'Ciao', 'привет'];
    this.greeting = greetings[Math.floor(Math.random() * greetings.length)]
      .concat(' ')
      .concat(AuthService.User.name);


    this.toolbarService.setTitle(this.greeting);
    this.footerControl.toggleFooter(FooterSetting.getInstance().ADD_DIFFUSION);
    /*this.toolbarService.setMenu([
      {url: 'menu1', name: 'Munu uno'},
      {url: 'menu2', name: 'Munu dos'},
      {url: 'menu3', name: 'Munu tres'},
      {url: 'menu4', name: 'Munu cuatro'}
      ]);*/
  }

  addDiffusion(): void {
    this.publicationService.addDiffusionLink(<DiffusionInterface>{user: AuthService.User});
  }

}
