import {ActivatedRoute, Router} from "@angular/router";
import {Component, ElementRef, AfterViewInit} from "@angular/core";
import {UserService} from "../../../services/http/user.service";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {ViewChild} from "@angular/core";
import {FooterControl} from "../../../controls/footer.control";

declare var ColorThief: any;

@Component({
  selector: 'user-detail',
  template: `
<style>
.user-cover {
  height: 230px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}
</style>

<div *ngIf="user != null; else loading">
  
  
  <user-detail-tabs [user]="user"></user-detail-tabs>
  
</div>
<ng-template #loading>
  <md-progress-bar mode="indeterminate"></md-progress-bar>
</ng-template>
`
})
export class UserDetailComponent implements AfterViewInit {

  //@ViewChild('imageCover') imageCoverElement: ElementRef;
  executing: boolean = false;
  user: UserEntity;
  authUser: UserEntity = AuthService.User;
  isFollowing: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private toolbarService: ToolbarService){ }

  ngOnInit(): void {

    this.route.params.map(params => params['id']).subscribe((id) => {

      this.executing = true;
      this.userService.byId(id).subscribe( response => {
        this.user = response;
        this.executing = false;

        this.toolbarService.setTitle(this.user.name.concat(' ').concat(this.user.lastName));

        this.defineLayoutOptions();

      });
    });
  }

  ngAfterViewInit() { }

  setAuth(): void {
    this.user = AuthService.User;
  }

  defineLayoutOptions(): void {

    let index: number = Math.floor(Math.random() * 10);
    let image: string = 'http://localhost/qss-core/public/images/static/image'+index+'.jpg';
    //this.imageCoverElement.nativeElement.style.backgroundImage = 'url('+image+')';

    if(this.user.id == this.authUser.id){

      this.toolbarService.setMenu([
        {url: '/setting/account', name: 'cuenta'},
        {url: '/setting/image', name: 'imágen'}
      ]);

    }else{
      this.isFollowing = this.authUser.isFollowingUser(this.user.id);
      this.defineFollowButton();
    }
  }

  get coverStyle(): any {
    let index: number = Math.floor(Math.random() * 10);
    let image: string = 'http://localhost/qss-core/public/images/static/image0.jpg';
    return { 'background-image': 'url('+image+')' };
  }

  follow(): void {
    let action: boolean = (!this.authUser.isFollowingUser(this.user.id));
    this.userService.follow(this.user.id, action).subscribe(resp => {
      console.log(resp);
      this.isFollowing = (!this.isFollowing);
      this.defineFollowButton();
    });
  }

  defineFollowButton(): void {
    if(this.isFollowing){
      this.toolbarService.setRightButton({text: 'DEJAR', icon: '', click: ()=>{this.follow()}});
    }else{
      this.toolbarService.setRightButton({text: 'SEGUIR', icon: '', click: ()=>{this.follow()}});
    }
  }

}
