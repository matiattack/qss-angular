import {Component, Input, DoCheck, Output, EventEmitter} from "@angular/core";
import {StreetEntity} from "../../entities/street.entity";

@Component({
  selector: 'location-list',
  template: `
<md-nav-list>
  <h3 md-subheader>Lugares agregados</h3>
  <md-list-item *ngFor="let location of locations">
    <md-checkbox md-list-icon (change)="interaction(location, $event.checked);"></md-checkbox>
    <h4 md-line>{{location.name}} {{location.number}}</h4>
    <p md-line *ngIf="location.city != null">{{location.city.name}}</p>
  </md-list-item>
  <md-divider></md-divider>
</md-nav-list>
`
})
export class LocationListComponent implements DoCheck {

  @Input() locations: StreetEntity[];
  @Output() locationselect: EventEmitter<StreetEntity[]> = new EventEmitter<StreetEntity[]>();

  locationsselected: StreetEntity[] = [];


  ngDoCheck(): void {
    //console.log(this.locations);
  }

  interaction(location: StreetEntity, selected: boolean){
    if(selected){
      this.locationsselected.push(location);
    }else{
      for(let i: number = 0; i<this.locationsselected.length; i++){
        if(this.locationsselected[i].id == location.id){
          this.locationsselected.splice(i, 1);
          break;
        }
      }
    }
    this.locationselect.emit(this.locationsselected);
  }

}
