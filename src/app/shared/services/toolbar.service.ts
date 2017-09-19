import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';
import {ToolbarInterface} from "../../interfaces/toolbar.interface";
import {ToolbarMenuInterface} from "../../interfaces/toolbar-menu.interface";
import {ToolbarButton} from "../../interfaces/toolbar-button.interface";
import {Router, NavigationStart} from "@angular/router";

@Injectable()
export class ToolbarService {

  toolbar: ToolbarInterface = this.defaultOptions;

  toolbarSubject: Subject<ToolbarInterface> = new Subject<ToolbarInterface>();

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationStart){
        this.setDefault();
      }
    });
  }

  public getToolbar(): Subject<ToolbarInterface> {
    return this.toolbarSubject;
  }

  public setDefault(): void {
    this.toolbar = {
      hidden: false,
      color: '#00bcd4',
      title: '',
      menu: [],
      backOption: null,
      rightButton: null,
      leftButton: null,
      hiddenLeftMenu: false
    };
    this.next();
  }

  public setToolbar(toolbar: ToolbarInterface): void {
    this.toolbar = toolbar;
    this.next();
  }

  public setRightButton(button: ToolbarButton): void {
    this.toolbar.rightButton = button;
    this.next();
  }

  public setLeftButton(button: ToolbarButton): void {
    this.toolbar.leftButton = button;
    this.next();
  }

  public setColor(color: string): void {
    console.log('SEND COLOR');
    this.toolbar.color = color;
    this.next();
  }

  public setTitle(title: string): void {
    this.toolbar.title = title;
    this.next();
  }

  public setMenu(menu: ToolbarMenuInterface[]): void {
    this.toolbar.menu = menu;
    this.next();
  }

  public hiddeToolbar(): void {
    this.toolbar.hidden = true;
    this.next();
  }

  public hiddeLeftMenu(): void {
    this.toolbar.hiddenLeftMenu = true;
    this.next();
  }

  get defaultOptions(): ToolbarInterface {
    return {
      hidden: false,
      color: '#00bcd4',
      title: '',
      menu: [],
      backOption: null,
      rightButton: null,
      leftButton: null,
      hiddenLeftMenu: false
    };
  }

  private next(): void {
    this.toolbarSubject.next(this.toolbar);
  }

}
