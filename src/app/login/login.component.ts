import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient  } from '@angular/common/http';
import { m } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required),
    browserName:new FormControl(null),
    browserVersion:new FormControl(null),
    ipAddress:new FormControl(null)
  });
  ipAddress = '';
  constructor(private _router:Router, private _user:UserService,private http:HttpClient) { }

  browserName = '';
  browserVersion = '';

  ngOnInit() {
   
    this.getIPAddress();
    this.browserName = this.detectBrowserName();
      this.browserVersion = this.detectBrowserVersion();

  }
  detectBrowserName() { 
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
   

  detectBrowserVersion(){
      var userAgent = navigator.userAgent, tem, 
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      
      if(/trident/i.test(matchTest[1])){
          tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
          return 'IE '+(tem[1] || '');
      }

      if(matchTest[1]=== 'Chrome'){
          tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }

      matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];

      if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest.join(' ');
  }
  


  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }
  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid');return;
    }
console.log( this.ipAddress);
console.log(this.browserName);
console.log(this.browserVersion);
this.loginForm.patchValue({ ipAddress: this.ipAddress, browserName: this.browserName,browserVersion:this.browserVersion });

   console.log(JSON.stringify(this.loginForm.value));
    this._user.login(this.loginForm.value)
    .subscribe(
      data=>{console.log(data);
        this._router.navigate(['/user']);} ,
      error=>console.error(error)
    )
  }

}
