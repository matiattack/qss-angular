import {Component, ViewContainerRef} from "@angular/core";
import {LocationInterface} from "../../../interfaces/location.interface";
import {LocationService} from "../../../services/http/location.service";
import {StreetEntity} from "../../../entities/street.entity";
import {AuthService} from "../../../services/auth.service";
import {UserEntity} from "../../../entities/user.entity";
import {MdSnackBar} from "@angular/material";
import {DialogService} from "../../../shared/services/dialog.service";


@Component({
  selector: 'setting-location',
  template: `
<md-expansion-panel #serachLocationPanel *ngIf="!isSelecting; else deletePanel;">
  <md-expansion-panel-header>
    <mat-panel-description>AGREGAR UNA NUEVA UBICACIÓN</mat-panel-description>
  </md-expansion-panel-header>
  <input-address class="form-input" (onaddressselect)="addLocation($event);"></input-address>
</md-expansion-panel>

<ng-template #deletePanel>
  <md-card>
    <md-card-subtitle>¿Eliminar las ubicaciones seleccionadas para siempre?</md-card-subtitle>
    <md-card-actions>
      <button md-button class="pull-right" (click)="deleteLocations();"><md-icon>delete_forever</md-icon> ELIMINAR</button>
      <div style="clear: both;"></div>
    </md-card-actions>
  </md-card>
</ng-template>

<location-list *ngIf="streets.length > 0" [locations]="streets" (locationselect)="whenSelectLocations($event);"></location-list>
`
})
export class SettingLocationComponent {

  user: UserEntity = AuthService.User;
  streets: StreetEntity[] = [];
  toDeleteSelected: StreetEntity[] = [];
  isSelecting: boolean = false;

  constructor(private locationService: LocationService, public snackBar: MdSnackBar, private dialogService: DialogService, private viewContainerRef: ViewContainerRef){}

  ngOnInit(): void {
    this.locationService.byUser(this.user.id).subscribe( resp => {
      this.streets = resp;
    });
  }

  addLocation(location: LocationInterface){
    if(!this.hasLocation(location)){
      this.locationService.save(location).subscribe( resp => {
        if(resp instanceof StreetEntity){
          this.streets.push(resp);
        }
      });
    }else{
      /*this.snackBar.open('LA ubicación seleccionada ya ha sido agregada', '', {
        duration: 3000
      });*/
    }
  }

  deleteLocations(): void{

    let titleMessage: string = 'Eliminar ubicaciones(s)';
    let subtitleMessage: string = '¿Seguro desea elminiar la o las ubicaciones?';
    let deleteButtonMessage: string = 'ELIMINAR';
    let cancelButtonMessage: string = 'CANCELAR';

    this.dialogService.confirm(titleMessage, subtitleMessage, deleteButtonMessage, cancelButtonMessage, this.viewContainerRef).subscribe(confirmResp => {
      if(confirmResp){
        let ids: number[] = this.toDeleteSelected.map(item => item.id);

        this.locationService.destroy(ids).subscribe(r => {

          let cleanArray: StreetEntity[] = [];
          for(let i: number = 0; i < this.streets.length; i++){
            if(!(ids.indexOf(this.streets[i].id) > -1)){
              cleanArray.push(this.streets[i]);
            }
          }

          this.streets = cleanArray;
          this.isSelecting = false;
          this.toDeleteSelected = [];

        });
      }
    });

  }

  whenSelectLocations(locations: StreetEntity[]): void {
    if(locations.length > 0){
      this.isSelecting = true;
      this.toDeleteSelected = locations;
    }else{
      this.isSelecting = false;
      this.toDeleteSelected = [];
    }
  }

  private hasLocation(location: LocationInterface): boolean {

    for(let i: number = 0; i < this.streets.length; i++){
      if(this.streets[i].name == location.street.name && this.streets[i].number == location.street.number && this.streets[i].city.name == location.city){
        return true;
      }
    }
    return false;
  }

}
