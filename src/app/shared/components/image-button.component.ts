import {Component, Output, EventEmitter} from "@angular/core";
import {LocalImageInterface} from "../../interfaces/local-image.interface";

@Component({
  selector: 'image-buttom',
  template: `
<style>
.get-image-container > input
{
  display: none;
}

.get-image-container span
{
  cursor: pointer;
}
</style>
<div class="get-image-container">
  <label for="image-input">
    <span class="mat-icon-button">
      <span class="mat-button-wrapper">
        <md-icon>photo</md-icon>
      </span>
    </span>
  </label>
  <input type="file" id="image-input" (change)="changeImage(image)" #image />
</div>`
})
export class ImageButtonComponent {

  @Output()
  onselect: EventEmitter<LocalImageInterface> = new EventEmitter<LocalImageInterface>();

  public changeImage(input: any) {
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(input.files[0]);
    var reader = new FileReader();
    reader.addEventListener("load", (event) => {
      img.src = reader.result;
      //let base64 = this.resizeImage(img, 180, 180);
      let image: LocalImageInterface = {base64url: reader.result};
      this.onselect.emit(image);
    }, false);
    reader.readAsDataURL(input.files[0]);
  }

  private resizeImage(img, MAX_WIDTH: number = 2100, MAX_HEIGHT: number = 2100){

    var canvas = document.createElement("canvas");

    var width = img.formWidth;
    var height = img.formHeight;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, width, height);

    var dataUrl = canvas.toDataURL('image/jpeg');
    // IMPORTANT: 'jpeg' NOT 'jpg'
    return dataUrl
  }

}
