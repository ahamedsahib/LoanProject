import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PropertyserviceService } from 'src/app/Service/PropertyService/propertyservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
PropertyForm !:FormGroup;
userId=JSON.parse((localStorage.getItem('LoanProjectDetails'))!).userId;
Name=JSON.parse((localStorage.getItem('LoanProjectDetails'))!).userName;
emailId=JSON.parse((localStorage.getItem('LoanProjectDetails'))!).emailId;
phone=JSON.parse((localStorage.getItem('LoanProjectDetails'))!).phoneNumber;
LoanFormOpenStatus=false;
AddPropertiesFormStatus=false;
properties: { Property: string, PropertyWorth: any}[] =[];

Formdata:{formId: any,loanAmount: any,reasonForLoan: string,status: string}[]=[];

  constructor(private propertyService:PropertyserviceService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.PropertyForm = new FormGroup({
      Name: new FormControl('',[Validators.required]),
       Worth:new FormControl('',[Validators.required,Validators.pattern('^[0-9]+'),])
     });
     this.getLoanApplicationStatus();
  }
 AddProp(){
  this.properties.push({ Property:this.PropertyForm.value.Name , PropertyWorth:Number(this.PropertyForm.value.Worth)});
  this.PropertyForm.reset();
  this.AddPropertiesFormStatus=false;
 }
 delete(index:any){
  this.properties.splice(index,1);
 }
 ApplyLoan(loanName:any){
  let params={
    ReasonForLoan:loanName,
    propertiesList:this.properties,
    UserId: this.userId,
  }
  this.propertyService.ApplyLoan(params).
  subscribe((status:any)=>
  {
    this.snackBar.open(`${status.message}`, '', {duration: 3000 ,verticalPosition: 'bottom', 
          horizontalPosition: 'left' })
    if(`${status.status == true}`)
    {
      this.properties=[];
      this.PropertyForm.reset();
      this.LoanFormOpenStatus=false;
      this.getLoanApplicationStatus();
    }
  });
 }
 get s() { return this.PropertyForm.controls; }
    CancelApplication(){
      this.properties=[];
      this.PropertyForm.reset();
      this.LoanFormOpenStatus=false;
      this.AddPropertiesFormStatus=false;
    }
    getLoanApplicationStatus()
    {
      this.propertyService.loanApplications(this.userId).
      subscribe((status:any)=>
      {
        console.log(status.data);
        if(`${status.status == true}`)
        {
         this.Formdata=status.data;
        }
      });
   }
   logout(){
     localStorage.removeItem('LoanProjectDetails');
     this.router.navigate(['/home']);
   }
}
