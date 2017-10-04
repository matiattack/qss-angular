import {
  Component, ElementRef, NgZone, EventEmitter, Output, ViewChild, ViewContainerRef,
  ChangeDetectorRef, ChangeDetectionStrategy
} from "@angular/core";
import {Prediction, AddressPredictionDirective} from "../../directives/address-prediction.directive";
import {DialogService} from "../services/dialog.service";
import {StreetEntity} from "../../entities/street.entity";
import {LocationInterface} from "../../interfaces/location.interface";

@Component({
  selector: 'input-address',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div #placeService></div>
<md-input-container class="full-width">
  <input type="text" mdInput addressPrediction (onpredict)="showPredictions($event);" (onsearching)="searching = true;" placeholder="Ingrese una dirección">
  <md-hint align="end" *ngIf="searching">Buscando...</md-hint>
</md-input-container>

<div *ngIf="predictions.length > 0 && !searching">
<md-nav-list>
  <div *ngFor="let prediction of predictions">
    <a md-list-item (click)="locationDetail(prediction);">
      <h4 md-line>{{ prediction.name }} </h4>
    </a>
    <md-divider></md-divider>
  </div>
</md-nav-list>
</div>
`
})
export class InputAddressComponent {

  @Output()
  onaddressselect: EventEmitter<LocationInterface> = new EventEmitter<LocationInterface>();

  @ViewChild('placeService') placeServiceEl;

  predictions: Prediction[] = [];
  searching: boolean;
  address: string = '';

  constructor(private dialogService: DialogService, private viewContainerRef: ViewContainerRef, private changeDetector: ChangeDetectorRef){}

  showPredictions(predictions: any[]): void {
    this.searching = false;
    this.predictions = predictions;
    this.changeDetector.markForCheck();
  }

  locationDetail(prediction: Prediction): void {

    let request = { reference: prediction.id };

    let title: string = 'Nueva dirección';
    let subtitle: string = '¿Desea seleccionar \''.concat(prediction.name).concat('\'?');
    let okText: string = 'SI';
    let cancelText: string = 'VOLVER';

    this.dialogService.confirm(title, subtitle, okText, cancelText, this.viewContainerRef).subscribe(resp => {
      if(resp){

        this.predictions = [];
        this.changeDetector.detectChanges();

        AddressPredictionDirective.getplaceService(this.placeServiceEl)
          .getDetails(request , ( details, status )=>{
            let street: StreetEntity = new StreetEntity(details.address_components[1].long_name, details.address_components[0].long_name, details.geometry.location.lat(), details.geometry.location.lng());

            let location: LocationInterface = {
                street: street,
                city: details.address_components[2].long_name,
                state: details.address_components[5].long_name,
                country: details.address_components[6].long_name
            };

            this.onaddressselect.emit(location);
          });
      }
    });

  }

}

