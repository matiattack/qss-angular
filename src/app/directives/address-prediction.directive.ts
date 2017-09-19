import {Directive, HostListener, ElementRef, Output, EventEmitter, ViewContainerRef} from "@angular/core";
import {Observable, Subscription} from "rxjs";

declare var google: any;

export interface Prediction {
  id: string;
  name: string;
}

@Directive({ selector: '[addressPrediction]' })
export class AddressPredictionDirective {

  @Output() onpredict: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() onsearching: EventEmitter<boolean> = new EventEmitter<boolean>();

  resolveSuggestions: (predictions, status) => void;
  autocompleteService: any;
  search: any;
  input: string = '';
  country: string = 'cl';//debera ser @Input()

  constructor(private el: ElementRef){}

  ngOnInit(): void {


    this.autocompleteService =  new google.maps.places.AutocompleteService();

    this.resolveSuggestions = (predictions, status) => {

      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert('AutocompleteService error: '.concat(status));
        return;
      }

      let places: Prediction[] = [];

      for(let i: number = 0; i<predictions.length; i++){
        let place: Prediction = { id: predictions[i].reference, name: predictions[i].description };
        places.push(place);
      }
      this.onpredict.emit(places);

    };
  }

  @HostListener('keyup') onKeyUp() {
    if(this.el.nativeElement.value.trim() != this.input.trim()){
      this.input = this.el.nativeElement.value;
      if(this.input.length > 4){
        this.searchAddress();
      }
    }
  }

  @HostListener('keydown') onKeyDown() {
    if(this.search){
      clearInterval(this.search);
      this.search = null;
    }
  }

  private searchAddress(): void {
    this.onsearching.emit(true);
    this.search = setTimeout(() => {
      this.autocompleteService.getPlacePredictions({
        input: this.input,
        componentRestrictions: { country : this.country }
      }, this.resolveSuggestions);
      clearInterval(this.search);
    }, 3000);
  }

  public static getplaceService(el: ElementRef): any {

    let anchor = el.nativeElement;
    return new google.maps.places.PlacesService(anchor);
  }

}
