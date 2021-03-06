import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {UserDetailComponent} from "./components/user-detail.component";
import {UserHomeComponent} from "./components/user-home.component";
import {UserFollowingsComponent} from "./components/user-detail/user-followings.component";
import {UserFollowersComponent} from "./components/user-detail/user-followers.component";
import {UserPublicationsComponent} from "./components/user-detail/user-publications.component";

const appRoutes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: ':id', component: UserDetailComponent, children: [
    { path: 'followings', component: UserFollowingsComponent },
    { path: 'followers', component: UserFollowersComponent },
    { path: 'publications', component: UserPublicationsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
