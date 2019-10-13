import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthWithJwtPageComponent } from './auth-with-jwt-page/auth-with-jwt-page.component';
import { HomePageComponent } from './home-page/home-page.component';

/**
 * SPA routing configuration.
 */
const routes: Routes = [
  {
    path: 'auth-with-jwt/:jwt',
    component: AuthWithJwtPageComponent
  },
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
