import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpServiceService) { }
  Register(data:any){
    const params={
      UserName : data.name,
      PhoneNumber : data.phone,
      Gender:data.gender,
      EmailId :data.email,
      Password : data.password,
      Profession:data.profession
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/Register`,params)
  }

  Login(data:any){
    const params={
      EmailId :data.email,
      Password : data.password,
    }
    return this.httpService.post(`${environment.baseUrl}/api/login`,params)
  }
}
