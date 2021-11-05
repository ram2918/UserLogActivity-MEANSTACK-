import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent implements OnInit {
  data:userLogData[]
  username:String='';
  constructor(private _user:UserService, private _router:Router) { 
    this._user.userLogsList()
    .subscribe(
      data=>this.addData(data),
      error=>this._router.navigate(['/login'])
    )
  }

 async addData(data){
    console.log(data.data);
    await localStorage.setItem('checkLogin', "true");
    this.data =data.data
   
  }
  ngOnInit() {
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }

}
export class userLogData {
  browserName:  String;
	browserVersion:  String;
	email:  String;
	ipAddress:  String;
  createdAt:string;
}
