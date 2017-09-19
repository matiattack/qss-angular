import {Component} from "@angular/core";
import {UserEntity} from "../../../entities/user.entity";
import {AuthService} from "../../../services/auth.service";
import {ImageService} from "../../../services/image.service";
import {ImageEntity} from "../../../entities/image.entity";
import {AppSetting} from "../../../settings/app.setting";

@Component({
  selector: 'setting-image',
  template: `
<style>
  .actual-image {
    width: 160px; height: 160px; border-radius: 50%; margin: auto; 
    background-repeat: no-repeat; background-size: cover;
  }
</style>
<div class="container">
  
  <div class="full-width" style="text-align: center; padding: 10px 0px 10px 0px;width: auto;">
    <div class="actual-image" [ngStyle]="{
      'background-image': 'url(' + ((image != null)?image.path:user.image.path) + ')' 
    }">
    
      <image-buttom class="pull-right" *ngIf="image == null" (onselect)="addImageDialog($event);"></image-buttom>
      
      <button class="pull-right" *ngIf="image != null" md-mini-fab (click)="setImage(image);"><md-icon>check</md-icon></button>  
      <button class="pull-left" *ngIf="image != null" md-mini-fab (click)="image = null;"><md-icon>delete</md-icon></button>
      
    </div>
  </div>
  
  <div class="scrollmenu" *ngIf="image == null" >
    <div class="scrollitem" *ngFor="let image of images">
      <md-card>
        <img md-card-image src="{{mediaEndpoint.concat('/').concat(image.path)}}" style="height: 160px;">
        <md-card-footer>
          <button (click)="selectImage(image);" md-raised-button class="full-width"><md-icon>done</md-icon></button>
        </md-card-footer>
      </md-card>
    </div>
  </div>  
  
</div>
`
})
export class SettingImageComponent {

  user: UserEntity = AuthService.User;
  image: ImageEntity;
  images: ImageEntity[] = [];
  mediaEndpoint = AppSetting.MEDIA_ENDPOINT;


  constructor(private imageService: ImageService, private authService: AuthService){}

  ngOnInit(): void{
    this.imageService.byUser(this.user.id).subscribe( resp => {
      this.images = resp;
    });
  }

  addImageDialog(base64image: string): void {
    let params = { id: 0, path: base64image };
    this.image = new ImageEntity().parse(params);
  }

  selectImage(image: ImageEntity): void {
    let params = { id: image.id, path: this.mediaEndpoint.concat('/').concat(image.path) };
    this.image = new ImageEntity().parse(params);
  }

  setImage(image): void {
    this.authService.updateImage(image).subscribe(resp => {
      this.user = AuthService.User;
      this.image = null;
    });
  }

}
