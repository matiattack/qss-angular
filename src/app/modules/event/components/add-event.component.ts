import {Component, ViewContainerRef} from "@angular/core";
import {Location} from '@angular/common';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {ToolbarService} from "../../../shared/services/toolbar.service";
import {DisciplineEntity} from "../../../entities/discipline.entity";
import {DiffusionLink} from "../../../caches/diffusion.link";
import {DialogService} from "../../../shared/services/dialog.service";
import {UnsplashEntity} from "../../../entities/unsplash.entity";
import {StreetEntity} from "../../../entities/street.entity";
import {FormGroup} from "@angular/forms";
import {FormControlService} from "../../../shared/services/form-control.service";
import {AppSetting} from "../../../settings/app.setting";
import {EventEntity} from "../../../entities/event.entity";
import {EventService} from "../../../services/http/event.service";

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
<form [formGroup]="addEventFormControl" novalidate>
<md-card style="margin-bottom: 10px;">
  <md-card-title-group>
    <md-card-title>Nuevo evento</md-card-title>
    <md-card-subtitle>Ingrese los siguientes datos que se indican mas abajo y posteriormente presione CREAR EVENTO.</md-card-subtitle>
    <!--<img md-card-md-image *ngIf="unsplashImage != null;" src="{{unsplashImage.image.thumb}}">-->
  </md-card-title-group>
  <md-card-actions>
    <button md-raised-button color="primary" [disabled]="!isComplete" (click)="createEvent();">CREAR EVENTO</button>
    <button md-button (click)="windowLocation.back()">CANCELAR</button>
  </md-card-actions>
</md-card>

<md-accordion class="example-headers-align">
  
  <md-expansion-panel *ngIf="isAnAvailableStep(0);" #typePanel [expanded]="step === 0" (opened)="setStep(0);" hideToggle="true" >
    <md-expansion-panel-header>
      <md-panel-title>
        Tipo de evento
      </md-panel-title>
      <md-panel-description>
        <span>Evento {{(isPublic)?'público':'privado'}}</span>
      </md-panel-description>
    </md-expansion-panel-header>
    
    <md-radio-group [(ngModel)]="isPublic" [ngModelOptions]="standAloneOption">
      <md-radio-button [value]="true" style="margin-bottom: 10px;">
        Publico: Cualquiera podrá ver tu evento y buscarlo
      </md-radio-button>
      <md-radio-button [value]="false">
        Privado: Solo los invitados verán tu evento.
      </md-radio-button>
    </md-radio-group>  
    
    <md-action-row>
    
      <button md-button color="primary" 
        (click)="nextStep()">
        CONTINUAR <md-icon>keyboard_arrow_right</md-icon>
      </button>
      
    </md-action-row>
  </md-expansion-panel>
  
  <md-expansion-panel *ngIf="isAnAvailableStep(1);" #datePanel [expanded]="step === 1" (opened)="setStep(1);" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Fecha del evento
      </md-panel-title>
      <md-panel-description>
        {{eventDateText}}
      </md-panel-description>
    </md-expansion-panel-header>
    
      <table cellspacing="0" width="100%">
        <tr>
          <td width="30%">
            Inicio
          </td>
          <td width="35%">
            <md-form-field
            [style.width]="'100%'">
              <input mdInput [min]="today" [mdDatepicker]="startPicker" placeholder="Seleccione una fecha" readonly (focus)="startPicker.open()" [(ngModel)]="startDate" [ngModelOptions]="standAloneOption">
              <md-datepicker-toggle mdSuffix [for]="startPicker"></md-datepicker-toggle>
              <md-datepicker touchUi="true" #startPicker></md-datepicker>
            </md-form-field>
          </td>
          <td width="35%">
            <md-form-field
            [style.width]="'100%'">
              <input mdInput placeholder="Desde" #start formControlName="start" [(ngModel)]="startTime">
              <md-error *ngIf="addEventFormControl.get('start').hasError('pattern')">
                Ingrese una hora valida
              </md-error>
            </md-form-field>
          </td>
        </tr>
        
        <tr>
          <td width="30%">
            Termino
          </td>
          <td width="35%">
            <md-form-field
            [style.width]="'100%'">
              <input mdInput [min]="startDate" [mdDatepicker]="endPicker" placeholder="Seleccione una fecha" readonly (focus)="endPicker.open()" [(ngModel)]="endDate" [ngModelOptions]="standAloneOption">
              <md-datepicker-toggle mdSuffix [for]="endPicker"></md-datepicker-toggle>
              <md-datepicker touchUi="true" #endPicker></md-datepicker>
            </md-form-field>
          </td>
          <td width="35%">
            <md-form-field
            [style.width]="'100%'">
              <input mdInput placeholder="Desde" #start formControlName="end" [(ngModel)]="endTime">
              <md-error *ngIf="addEventFormControl.get('end').hasError('pattern')">
                Ingrese una hora valida
              </md-error>
            </md-form-field>
          </td>
        </tr>
      </table>

    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      
      <button md-button color="primary" 
        (click)="nextStep()"
        [disabled]="!addEventFormControl.get('start').valid || !addEventFormControl.get('end').valid || !eventDate == null">
        CONTINUAR <md-icon>keyboard_arrow_right</md-icon>
      </button>
    </md-action-row>
  </md-expansion-panel>
  
  <md-expansion-panel *ngIf="isAnAvailableStep(2);" #namePanel [expanded]="step === 2" (opened)="setStep(2); eventName.focus();" hideToggle="true" >
    <md-expansion-panel-header>
      <md-panel-title>
        Nombre
      </md-panel-title>
      <md-panel-description>
        <span *ngIf="name.trim() == ''; else eventNameSpan">Ingrese un nombre para el evento</span>
        <ng-template #eventNameSpan>{{name}}</ng-template>
      </md-panel-description>
    </md-expansion-panel-header>

    <md-form-field class="full-width">
      <input mdInput placeholder="Nombre del evento" #eventName [(ngModel)]="name" formControlName="name">
      <md-error *ngIf="addEventFormControl.get('name').hasError('required')">
        Debe ingresar un nombre
      </md-error>
    </md-form-field>

    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      <button md-button color="primary" 
        (click)="nextStep()" 
        [disabled]="!addEventFormControl.get('name').valid">
        CONTINUAR <md-icon>keyboard_arrow_right</md-icon>
      </button>
      
    </md-action-row>
  </md-expansion-panel>
  
  <md-expansion-panel *ngIf="isAnAvailableStep(3);" #coverPanel [expanded]="step === 3" (opened)="setStep(3);" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Imágen de portada
      </md-panel-title>
      
      <md-panel-description>
        <span *ngIf="unsplashImage == null; else coverPrev">Seleccione una imágen para la portada del evento</span>
        <ng-template #coverPrev>
          <img src="{{unsplashImage.image.thumb}}" style="width: 50px">
        </ng-template>
      </md-panel-description>
      
    </md-expansion-panel-header>

    <input-unsplash (unsplashselect)="unsplashImage = $event" *ngIf="unsplashImage == null; else unsplashImagePrev"></input-unsplash>
    
    <ng-template #unsplashImagePrev>
      <md-card>
        <img md-card-image src="{{unsplashImage.image.small}}">
      </md-card>      
    </ng-template>
    
    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      
      <button md-button color="primary" 
        (click)="nextStep()"
        [disabled]="unsplashImage == null">CONTINUAR <md-icon>keyboard_arrow_right</md-icon>
      </button>
    </md-action-row>
  </md-expansion-panel>
  
  <md-expansion-panel *ngIf="isAnAvailableStep(4);" #disciplinesPanel [expanded]="step === 4" (opened)="setStep(4)" hideToggle="true">
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
      
      <button md-button color="primary" 
        (click)="nextStep()"
        [disabled]="disciplines.length == 0">CONTINUAR <md-icon>keyboard_arrow_right</md-icon>
      </button>
    </md-action-row>
  </md-expansion-panel>

  <md-expansion-panel *ngIf="isAnAvailableStep(5);" #locationPanel [expanded]="step === 5" (opened)="setStep(5)" hideToggle="true">
    <md-expansion-panel-header>
      <md-panel-title>
        Ubicación del evento
      </md-panel-title>
      <md-panel-description>
        <span *ngIf="location == null; else locationDetail">Busque y seleccione la ubicación del evento</span>
        <ng-template #locationDetail>{{location.name}} {{location.number}}</ng-template>
      </md-panel-description>
    </md-expansion-panel-header>

    <input-address class="form-input" (onaddressselect)="addLocation($event)"></input-address>

    <md-action-row>
      <button md-button color="warn" (click)="prevStep()"><md-icon>keyboard_arrow_left</md-icon> ANTERIOR</button>
      
      <button md-button color="primary" 
        (click)="nextStep()"
        [disabled]="location == null">CONTINUAR <md-icon>keyboard_arrow_right</md-icon>
      </button>
    </md-action-row>
  </md-expansion-panel>

</md-accordion>
</form>
`
})
export class AddEventComponent{

  //Add event properties
  isPublic: boolean = true;
  startDate: Date = new Date();
  endDate: Date = new Date();
  startTime: string;
  endTime:string;
  name: string = '';
  disciplines: DisciplineEntity[] = [];
  location: StreetEntity;
  unsplashImage: UnsplashEntity = null;


  //Steps properties
  availableSteps: number[] = [0];
  step = 0;

  //form validation
  addEventFormControl: FormGroup;
  today: Date = new Date();

  constructor(
    private eventService: EventService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private toolbarService: ToolbarService,
    private windowLocation: Location,
    private diffusionLink: DiffusionLink,
    private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService,
    private formService: FormControlService){
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    let disciplinesAdded =  this.diffusionLink.getEventLinkData().disciplines;
    this.disciplines = (disciplinesAdded != null)?disciplinesAdded:[];
    this.toolbarService.hiddeToolbar();
    this.addEventFormControl = this.formService.addEventFormControl();
  }

  addDisciplineDialog(): void {
    this.dialogService.disciplineSelect(this.viewContainerRef, this.disciplines).subscribe(resp => {
      if(resp != null){
        this.disciplines = resp;
        this.nextStep();
      }
    });
  }

  addLocation(location: StreetEntity){
    this.location = location;
    this.nextStep();
  }

  createEvent(): void {

    let event: EventEntity = new EventEntity(
      this.isPublic,
      this.startDate,
      this.endDate,
      this.startTime,
      this.endTime,
      this.name,
      this.disciplines,
      this.location,
      this.unsplashImage
    );

    this.eventService.save(event).subscribe( response => {

    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    if(!this.isAnAvailableStep(this.step)){
      this.availableSteps.push(this.step);
    }
  }

  prevStep() {
    this.step--;
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

  get isComplete(): boolean {
    return (this.availableSteps.length >= 7);
  }

  isAnAvailableStep(step: number): boolean {
    for(let i:number = 0; i <= this.availableSteps.length; i++){
      if(this.availableSteps[i] == step)
        return true;
    }
    return false;
  }

  get standAloneOption(): any {
    return {'standalone': true};
  }

  get eventDateText(): string {

    if(this.endTime==null || this.startTime==null)
      return 'Ingrese fecha y hora del evento';

    if((this.startDate.getDay() == this.endDate.getDay()) && (this.startDate.getMonth() == this.endDate.getMonth())){
      return 'El ' +
        this.startDate.getDay() +
        ' de ' +
        AppSetting.MONTH(this.startDate.getMonth()) +
        ' de ' +
        this.startTime + ' a '  + this.endTime;
    }
    return 'Del ' +
      this.startDate.getDay() + '/' + this.startDate.getMonth() + ' ' + this.startTime +
        ' al ' + this.endDate.getDay() + '/' + this.endDate.getMonth() + ' ' + this.endTime;

  }

}
