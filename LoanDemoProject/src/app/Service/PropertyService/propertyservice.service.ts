import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyserviceService {

  constructor(private httpService:HttpServiceService) { }
  ApplyLoan(params:any){
    console.log(params);
    return this.httpService.post(`${environment.baseUrl}/api/Property/AddForm`,params);
  }
  loanApplications(userId:any)
  {
    return this.httpService.get(`${environment.baseUrl}/api/Property/Property/?userId=${userId}`);
  }
}
