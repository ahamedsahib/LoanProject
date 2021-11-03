import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';

const routes: Routes = [
  {path:'login',component:LoginsignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSignupRoutingModule { }
