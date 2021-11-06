import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';

@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.scss']
})
export class LoginsignupComponent implements OnInit {
  LoginForm!:FormGroup;
  SignUpForm!:FormGroup;
  constructor(private userService:UserServiceService,private router:Router) { }

  ngOnInit(): void {
    this.SignUpForm = new FormGroup({
      Name: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}([\\s]?[A-Za-z]{1,})*$'),Validators.minLength(3)]),
      EmailId: new FormControl('',[Validators.required, Validators.email]),
      Password:new FormControl('',[Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$')]),
      Phone:new FormControl('',[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      confirmPassword:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      profession:new FormControl('',[Validators.required])
    });
    this.LoginForm = new FormGroup({
     EmailId: new FormControl('',[Validators.required, Validators.email]),
      Password:new FormControl('',[Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$')])
    });
  }
  SignUp(){
    console.log(this.SignUpForm.value);
    this.userService.Register(this.SignUpForm.value).
        subscribe((status:any)=>
        {
          console.log(status);
          if(`${status.Status == true}`)
          this.ngOnInit();
      }); 
  }
  login(){
    
    this.userService.Login(this.LoginForm.value).
        subscribe((status:any)=>
        {
          console.log(status);
          if(`${status.status == true}`)
          localStorage.setItem('LoanProjectDetails',JSON.stringify(status.data));
          this.router.navigate(['/home/dashboard']);
      });
  }
  get f() { return this.LoginForm.controls; }
  get s() { return this.SignUpForm.controls; }

}
