import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {FooterInterface} from "../interfaces/footer.interface";

@Injectable()
export class FooterControl {

  private footerSubject: Subject<FooterInterface> = new Subject<FooterInterface>();

  constructor(private router: Router){
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart){
        this.setDefault();
      }
    });
  }

  public setDefault(){
    this.footerSubject.next(null);
  }

  public control(): Subject<FooterInterface> {
    return this.footerSubject;
  }

  public toggleFooter(footer: string): void {
    this.footerSubject.next({type: footer});
  }



}
