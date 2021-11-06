import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpServiceService) { }
  Register(data:any){
    console.log(data);
    console.log(data.Name);
    let params={
      UserName : data.Name,
      PhoneNumber : data.Phone,
      Gender:data.gender,
      EmailId :data.EmailId,
      Password : data.Password,
      Profession:data.profession
    }

    console.log(params);
    
    return this.httpService.post(`${environment.baseUrl}/api/User/Register`,params)
  }

  Login(data:any){
    console.log(data)
    const params={
      EmailId :data.EmailId,
      Password : data.Password,
    }
    console.log(params);
    return this.httpService.post(`${environment.baseUrl}/api/User/Login`,params)
  }
  
}
