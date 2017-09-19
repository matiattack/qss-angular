import {Directive, Input, ElementRef, HostListener, ViewContainerRef, EventEmitter, Output} from "@angular/core";
import {UserEntity} from "../entities/user.entity";
import {AuthService} from "../services/auth.service";
import {DialogService} from "../shared/services/dialog.service";


@Directive({ selector: '[editAuth]' })
export class EditAuthDirective {

  @Input('enableEdit') enableEdit: boolean;
  @Input('editAuthProp') editAuthProp: string;
  @Input('editAuthPropTitle') editAuthPropTitle: string;
  @Output() onAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  authUser: UserEntity = AuthService.User;

  constructor(private el: ElementRef, private authService: AuthService, private dialogService: DialogService, private viewContainerRef: ViewContainerRef) { }

  @HostListener('click') onClick() {
    if(this.enableEdit){
      this.dialogService.prompt(this.editAuthPropTitle, '', this.authUser[this.editAuthProp], this.viewContainerRef).subscribe(dialogResponse => {
        if(dialogResponse != null && dialogResponse.trim() != this.authUser[this.editAuthProp].trim()){
          let data = {};
          data[this.editAuthProp] = dialogResponse;
          let user: UserEntity = new UserEntity().parseEntity(data);

          this.authService.updateData(user).subscribe( data => {
            this.onAction.emit(true);
          });

        }else console.log('Nothing change');
      });
    }
  }

}
