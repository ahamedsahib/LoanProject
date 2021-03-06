import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupRoutingModule } from './login-signup-routing.module';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    LoginsignupComponent
  ],
  imports: [
    CommonModule,
    LoginSignupRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class LoginSignupModule { }
