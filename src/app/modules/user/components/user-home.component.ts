import {Component} from "@angular/core";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {FooterControl} from "../../../controls/footer.control";
import {FooterSetting} from "../../../settings/footer.setting";

@Component({
  selector: 'user-home',
  template: `
Aqui apareceran usuarios que te sugeriremos
`
})
export class UserHomeComponent {

  constructor(private toolbarService: ToolbarService, private footerControl: FooterControl){}

  ngOnInit(){
    //this.toolbarService.setTitle(true, 'USUARIOS');
    this.footerControl.toggleFooter(FooterSetting.getInstance().ADD_DIFFUSION);
  }

}
