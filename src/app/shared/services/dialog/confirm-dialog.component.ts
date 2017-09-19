import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  template: `
  <h2 md-dialog-title>{{ title }}</h2>
  <md-dialog-content>{{ subtitle }}</md-dialog-content>   
  
  <button type="button" md-button color="primary" class="pull-right"
      (click)="dialogRef.close(true)">{{ okText }}</button>
  <button type="button" md-button class="pull-right" 
      (click)="dialogRef.close(false)">{{ cancelText }}</button>
  <div style="clear: both;"></div>
    `,
})
export class ConfirmDialogComponent {

  public title: string;
  public subtitle: string;
  public okText: string;
  public cancelText: string;
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {

  }
}


