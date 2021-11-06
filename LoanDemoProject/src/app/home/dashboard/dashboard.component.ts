import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
PropertyForm !:FormGroup;
 map = new Map();  
LoanFormOpenStatus=false;
AddPropertiesFormStatus=false;
properties: { name: string, worth: string}[] =[];
Formdata=[
  {
'FormId':12,
'LoanName':'house',
'Amount':2000,
'Status':'Accepted'
}
]

  constructor() { }

  ngOnInit(): void {
    this.PropertyForm = new FormGroup({
      Name: new FormControl('',[Validators.required]),
       Worth:new FormControl('',[Validators.required])
     });
  }
 AddProp(){
  this.properties.push({ name:this.PropertyForm.value.Name , worth:this.PropertyForm.value.Worth });
  this.PropertyForm.reset();
  this.AddPropertiesFormStatus=false;
 }
 delete(index:any){
  this.properties.splice(index,1);
 }
 ApplyLoan(loanName:any){
 this.map.set('name', loanName); 
 this.map.set('properties',this.properties);
  console.log(this.map);    
  this.properties=[];
  this.LoanFormOpenStatus=false;
 }
 CancelApplication(){
  this.properties=[];
  this.LoanFormOpenStatus=false;
 }
}
