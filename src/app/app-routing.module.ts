import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RedirectComponent} from './redirect/redirect.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'redirect', component: RedirectComponent, pathMatch: 'full'},
  {path: 'user', component: UserComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
