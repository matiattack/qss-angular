import {
  Directive, ElementRef, Input, HostListener, Output, EventEmitter
} from '@angular/core';
import {UserEntity} from "../entities/user.entity";
import {UserService} from "../services/http/user.service";
import {AuthService} from "../services/auth.service";



@Directive({ selector: '[followAction]' })
export class FollowActionDirective{

  @Input('followActionUser') userAction: UserEntity;
  @Output() onAction: EventEmitter<UserEntity> = new EventEmitter<UserEntity>();
  @Output() onExecuting: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private userService: UserService, private authService: AuthService) { }

  @HostListener('click') onClick() {
    if (this.isValid()) {
      this.el.nativeElement.disabled = true;
      this.onExecuting.emit(true);

      console.log("@Input('userAction') userAction: UserEntity;");
      console.log(this.userAction);

      let other = this.userAction;
      if(this.isFollowing()){
        other.followers.forEach((object, index) => {
          if(AuthService.User.id == object.id){
            other.followers.splice(index, 1);
          }
        });
      }

      console.log(other);


      this.userService.follow(this.userAction.id, (!this.isFollowing())).subscribe(resp => {
        this.authService.authenticate().subscribe( authUser => {

          this.onExecuting.emit(false);
          this.onAction.emit(authUser);
          this.el.nativeElement.disabled = false;

        })
      });
    }
  }

  isValid(): boolean{
    if(AuthService.User.id != this.userAction.id){
      return true;
    }
    return false;
  }

  isFollowing() : boolean {
    if(AuthService.User.isFollowingUser(this.userAction.id)){
      return true;
    }
    return false;
  }

}
