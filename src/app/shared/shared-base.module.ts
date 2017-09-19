import {NgModule} from "@angular/core";

import {MaterialBaseModule} from "./material-base.module";

import {PromptDialogComponent} from "./services/dialog/prompt-dialog.component";
import {ImageButtonComponent} from "./components/image-button.component";
import {ConfirmDialogComponent} from "./services/dialog/confirm-dialog.component";
import {CommonModule} from "@angular/common";
import {PublicacionComponent} from "./components/publication.component";
import {CommentListComponent} from "./components/comment-list.component";
import {RouterModule} from "@angular/router";
import {CommentComponent} from "../modules/publication/components/comment-detail.component";
import {DisciplineDialogComponent} from "./services/dialog/discipline-dialog.component";


@NgModule({
  imports: [
    CommonModule,
    MaterialBaseModule,
    RouterModule
  ],
  declarations: [
    PromptDialogComponent,
    ImageButtonComponent,
    ConfirmDialogComponent,
    CommentListComponent,
    CommentComponent,
    PublicacionComponent,
    DisciplineDialogComponent
  ],
  entryComponents: [
    PromptDialogComponent,
    ConfirmDialogComponent,
    DisciplineDialogComponent
  ],
  exports: [
    PromptDialogComponent,
    ImageButtonComponent,
    ConfirmDialogComponent,
    CommentListComponent,
    PublicacionComponent,
    CommentComponent,
    DisciplineDialogComponent,
    MaterialBaseModule
  ]
})
export class SharedBaseModule { }

