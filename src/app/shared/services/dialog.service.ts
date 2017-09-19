import {Injectable, ViewContainerRef} from "@angular/core";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {Observable} from "rxjs";
import {PromptDialogComponent} from "./dialog/prompt-dialog.component";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog.component";
import {DisciplineEntity} from "../../entities/discipline.entity";
import {DisciplineDialogComponent} from "./dialog/discipline-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public prompt(title: string, placeholder: string, defaultValue: string, viewContainerRef: ViewContainerRef): Observable<string> {

    let dialogRef: MdDialogRef<PromptDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    //config.width = '100%';

    dialogRef = this.dialog.open(PromptDialogComponent, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.placeholder = placeholder;
    dialogRef.componentInstance.defaultValue = defaultValue;

    return dialogRef.afterClosed();
  }

  public confirm(title: string, subtitle: string, okText: string, cancelText: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.subtitle = subtitle;
    dialogRef.componentInstance.okText = okText;
    dialogRef.componentInstance.cancelText = cancelText;

    return dialogRef.afterClosed();
  }

  public disciplineSelect(viewContainerRef: ViewContainerRef, selected?: DisciplineEntity[]): Observable<DisciplineEntity[]> {

    let dialogRef: MdDialogRef<DisciplineDialogComponent>;
    let config = new MdDialogConfig();
    //config.width = '100%';
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(DisciplineDialogComponent, config);

    if(selected != null){
      dialogRef.componentInstance.selected = selected;
    }

    return dialogRef.afterClosed();
  }

}
