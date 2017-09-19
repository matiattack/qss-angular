import {Directive, Output, EventEmitter, HostListener, ElementRef} from "@angular/core";

@Directive({ selector: '[longClick]' })
export class LongClickDirective {

  @Output() onlongclick: EventEmitter<boolean> = new EventEmitter<boolean>();
  time: any;

  constructor(private el: ElementRef){}

  @HostListener('contextmenu', ["$event"]) onContextMenu(event: any) {
    console.log('event stopped');
    event.preventDefault();
  }

  @HostListener('click') onClick() {
    clearInterval(this.time);
  }

  @HostListener('touchstart') onTouchStart() {

    this.time = setTimeout(() => {
      this.onlongclick.emit(true);
      clearInterval(this.time);
    }, 1000);
  }

}
