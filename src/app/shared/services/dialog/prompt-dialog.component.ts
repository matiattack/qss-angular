import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'prompt-dialog',
  template: `
  <p md-dialog-title>{{ title }}</p>       
  <md-input-container
    [style.width]="'100%'">
    <textarea mdInput mdTextareaAutosize placeholder="{{ placeholder }}" #promptInput style="resize: none;">{{defaultValue}}</textarea>
  </md-input-container>
  
  <button type="button" md-button color="primary" class="pull-right"
      (click)="dialogRef.close(promptInput.value)">ENVIAR</button>
  <button type="button" md-button class="pull-right" 
      (click)="dialogRef.close()">CANCELAR</button>
    `,
})
export class PromptDialogComponent {

  public title: string;
  public placeholder: string;
  public defaultValue: string;

  constructor(public dialogRef: MdDialogRef<PromptDialogComponent>) {

  }
}


