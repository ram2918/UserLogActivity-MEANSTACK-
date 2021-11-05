import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://localhost:3000/api/auth/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this._http.post('http://localhost:3000/api/auth/login',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    
    });
  }

  user(){
    return this._http.get('http://localhost:3000/api/auth/user',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
       })
  }
  userLogsList(){
    return this._http.get('http://localhost:3000/api/userLogs/userLogList',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
       })
  }

  logout(){
    return this._http.get('http://localhost:3000/api/auth/logout',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
       })
  }

}
