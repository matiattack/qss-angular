import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {MdTabsModule, MdSnackBarModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';


import {MaterialBaseModule} from "../../shared/material-base.module";
import {UserRoutingModule} from "./user-routing.module";
import {UserDetailComponent} from "./components/user-detail.component";
import {UserHomeComponent} from "./components/user-home.component";
import {UserService} from "../../services/user.service";
import {UserListComponent} from "../../shared/components/user-list.component";
import {UserFollowingsComponent} from "./components/user-detail/user-followings.component";
import {UserFollowersComponent} from "./components/user-detail/user-followers.component";
import {UserCommentsComponent} from "./components/user-detail/user-comments.component";
import {DialogService} from "../../shared/services/dialog.service";
import {UserDiffusionService} from "../../services/user-diffusion.service";
import {CommentListComponent} from "../../shared/components/comment-list.component";
import {SharedBaseModule} from "../../shared/shared-base.module";
import {UserSharedModule} from "../../shared/user-shared.module";
import {UserDetailTabsComponent} from "./components/user-detail/uder-detail-tabs.component";
import {UserScheduleComponent} from "./components/user-detail/user-schedule.component";
import {ScheduleService} from "../../services/schedule.service";
import {SafeStylePipe} from "../../shared/pipes/safe-style.pipe";
import {PublicacionComponent} from "../../shared/components/publication.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    UserRoutingModule,
    MaterialBaseModule,
    MdTabsModule,
    MdListModule,
    MdSnackBarModule,
    MdMenuModule,
    SharedBaseModule,
    UserSharedModule,
    MdChipsModule
  ],
  declarations: [
    UserDetailComponent,
    UserHomeComponent,
    UserListComponent,
    UserFollowingsComponent,
    UserFollowersComponent,
    UserCommentsComponent,
    UserDetailTabsComponent,
    UserScheduleComponent,
    SafeStylePipe
  ],
  providers: [
    UserService,
    DialogService,
    UserDiffusionService,
    ScheduleService
  ]
})
export class UserModule { }
