import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyserviceService } from 'src/app/Service/PropertyService/propertyservice.service';
import { UserServiceService } from 'src/app/Service/UserService/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
PropertyForm !:FormGroup;
userId=JSON.parse((localStorage.getItem('LoanProjectDetails'))!).userId;
 map = new Map();  
LoanFormOpenStatus=false;
AddPropertiesFormStatus=false;
properties: { Property: string, PropertyWorth: any}[] =[];

Formdata:{formId: any,loanAmount: any,reasonForLoan: string,status: string}[]=[];

  constructor(private propertyService:PropertyserviceService) { }

  ngOnInit(): void {
    this.PropertyForm = new FormGroup({
      Name: new FormControl('',[Validators.required]),
       Worth:new FormControl('',[Validators.required])
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
    if(`${status.status == true}`)
    {
      this.properties=[];
      this.LoanFormOpenStatus=false;
      this.getLoanApplicationStatus();
    }
  });
 }
    CancelApplication(){
      this.properties=[];
      this.LoanFormOpenStatus=false;
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
}
