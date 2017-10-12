import {Component, ViewContainerRef} from "@angular/core";
import {Location} from '@angular/common';
import {ComponentContent} from "../../../interfaces/component-content.interface";
import {ToolbarInterface} from "../../../interfaces/toolbar.interface";
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {DisciplineEntity} from "../../../entities/discipline.entity";
import {DiffusionLink} from "../../../caches/diffusion.link";
import {DialogService} from "../../../shared/services/dialog.service";
import {LocationInterface} from "../../../interfaces/location.interface";
import {UnsplashService} from "../../../services/http/unsplash.service";
import {UnsplashEntity} from "../../../entities/unsplash.entity";

@Component({
  selector: 'add-event',
  template: `
<style>
.example-headers-align .mat-expansion-panel-header-title, 
.example-headers-align .mat-expansion-panel-header-description {
  flex-basis: 0;
}

.example-headers-align .mat-expansion-panel-header-description {
  justify-content: space-between;
  align-items: center;
}
</style>

<md-accordion class="example-headers-align">
  
  <md-expansion-panel [expanded]="step === 0" (opened)="setStep(0); eventName.focus();" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Nombre y descripción
      </md-panel-title>
      <md-panel-description>
        Ingrese un nombre y descripción para el evento
      </md-panel-description>
    </md-expansion-panel-header>

    <md-form-field class="full-width">
      <input mdInput placeholder="Nombre del evento" #eventName>
    </md-form-field>

    <md-form-field class="full-width">
      <textarea mdInput placeholder="Descripción del evento"></textarea>
    </md-form-field>

    <md-action-row>
      <button md-button color="primary" (click)="nextStep()">CONTINUAR <md-icon>keyboard_arrow_right</md-icon></button>
    </md-action-row>
  </md-expansion-panel>
  

  <md-expansion-panel [expanded]="step === 1" (opened)="setStep(1)" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Disciplinas
      </md-panel-title>
      <md-panel-description>
        <span *ngIf="disciplines.length == 0; else disciplineCount">Agregue las disciplinas que se practicaran en este evento</span>
        <ng-template #disciplineCount>
          {{disciplinesAdded}}
        </ng-template>
      </md-panel-description>
    </md-expansion-panel-header>
    
    
    <md-chip-list>
      <md-chip *ngFor="let discipline of disciplines">{{discipline.name}}</md-chip>
      &nbsp;
      <button md-mini-fab color="primary" (click)="addDisciplineDialog();"><md-icon>add</md-icon></button>
    </md-chip-list>

    <md-action-row>
      <button md-button color="warn" class="pull-left" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      <button md-button color="primary" (click)="nextStep()">CONTINUAR <md-icon>keyboard_arrow_right</md-icon></button>
    </md-action-row>
  </md-expansion-panel>

  <md-expansion-panel [expanded]="step === 2" (opened)="setStep(2)" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Lugar
      </md-panel-title>
      <md-panel-description>
        <span *ngIf="location == null; else locationDetail">Busque y seleccione la ubicación del evento</span>
        <ng-template #locationDetail>{{location.street.name}} {{location.street.number}}</ng-template>
      </md-panel-description>
    </md-expansion-panel-header>

    <input-address class="form-input" (onaddressselect)="addLocation($event)"></input-address>

    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      <button md-button color="primary" (click)="nextStep()">CONTINUAR <md-icon>keyboard_arrow_right</md-icon></button>
    </md-action-row>
  </md-expansion-panel>

  <md-expansion-panel [expanded]="step === 3" (opened)="setStep(3); picker.open();" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Fecha del evento
      </md-panel-title>
      <md-panel-description>
        <span *ngIf="eventDate == ''; else eventDateContainer">
          Seleccione la fecha del evento
        </span>
        <ng-template #eventDateContainer>
          {{eventDate}}
        </ng-template>
      </md-panel-description>
    </md-expansion-panel-header>

    <md-form-field>
      <input mdInput class="full-width" placeholder="Fecha del evento" [mdDatepicker]="picker" (focus)="picker.open()" readonly [(ngModel)]="eventDate">
      <md-datepicker-toggle mdSuffix [for]="picker"></md-datepicker-toggle>
      <md-datepicker touchUi="true" #picker></md-datepicker>
    </md-form-field>

    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      <button md-button color="primary" (click)="nextStep()">CONTINUAR <md-icon>keyboard_arrow_right</md-icon></button>
    </md-action-row>
  </md-expansion-panel>

  <md-expansion-panel [expanded]="step === 4" (opened)="setStep(4);" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Imágen de portada
      </md-panel-title>
      <md-panel-description>
        Seleccione una imágen para la portada del evento
      </md-panel-description>
    </md-expansion-panel-header>

    <table width="100%">
      <tr>
        <td width="80%">
          <md-input-container style="width: 100%;">
            <input tyoe="text" #searchImageInput mdInput mdTextareaAutosize placeholder="Ingrese una palabra para buscar imagenes">
          </md-input-container>
        </td>
        <td width="20%">
          <button md-mini-fab class="pull-right" (click)="searchImage(searchImageInput.value);"><md-icon>search</md-icon></button>
        </td>
      </tr>
    </table>
    
    <div *ngIf="unsplashRes.length > 0">
      <span>{{unsplashRes.length}} resultados encontrados</span>
      <md-grid-list cols="2" rowHeight="1:1">
        <md-grid-tile *ngFor="let unsplash of unsplashRes">
          <img src="{{unsplash.image.small}}">
        </md-grid-tile>
      </md-grid-list>
    </div>
    
    
    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      <button md-button color="primary" (click)="nextStep()">CONTINUAR <md-icon>keyboard_arrow_right</md-icon></button>
    </md-action-row>
  </md-expansion-panel>
  
  <md-expansion-panel [expanded]="step === 5" (opened)="setStep(5);" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Finalizar 
      </md-panel-title>
      <md-panel-description>
        Confirme los datos y cree el evento
      </md-panel-description>
    </md-expansion-panel-header>
    <button md-raised-button color="primary" style="width: 100%;">CREAR EVENTO</button>
  </md-expansion-panel>  
  
</md-accordion>
`
})
export class AddEventComponent implements ComponentContent {

  disciplines: DisciplineEntity[] = [];
  unsplashRes: UnsplashEntity[] = [];
  eventDate: string;
  location: LocationInterface;

  step = 0;

  constructor(
    private toolbarService: ToolbarService,
    private windowLocation: Location,
    private diffusionLink: DiffusionLink,
    private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService,
    private unsplashService: UnsplashService){}

  ngOnInit(): void {

    let disciplinesAdded =  this.diffusionLink.getEventLinkData().disciplines;
    this.disciplines = (disciplinesAdded != null)?disciplinesAdded:[];
    this.setUiPresentation();
  }

  addDisciplineDialog(): void {
    this.dialogService.disciplineSelect(this.viewContainerRef, this.disciplines).subscribe(resp => {
      this.disciplines = resp;
      this.nextStep();
    });
  }

  addLocation(location: LocationInterface){
    this.location = location;
    this.nextStep();
  }

  searchImage(keyword: string): void {
    this.unsplashService.getByKeyWord(keyword).subscribe(response => {
      this.unsplashRes = response;
      console.log('searchImage', response);
    });
  }

  setStep(index: number) {
    if(index == 2 && this.disciplines.length > 0){
      this.searchImage(this.disciplines[(this.disciplines.length)-1].name);
    }
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setUiPresentation(): void {

    let toolbarOptions: ToolbarInterface = this.toolbarService.defaultOptions;
    toolbarOptions.leftButton = {text: '', icon: 'clear', click: ()=>{ this.windowLocation.back() } };
    toolbarOptions.color = '#ffffff';
    toolbarOptions.title = 'Nuevo evento';

    this.toolbarService.setToolbar(toolbarOptions);

  }

  get disciplinesAdded(): string {

    let count = this.disciplines.length;
    let text = '';

    if(count == 1) return this.disciplines[0].name;

    this.disciplines.forEach((discipline, index) => {
      let separator = ((index+1) == count) ? '.' : ', ';
      text = text.concat(discipline.name).concat(separator);
    });

    return text;
  }

}
