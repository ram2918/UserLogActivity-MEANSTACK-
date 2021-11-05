import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginstatus:any;
 async ngOnInit() {
   
  this.loginstatus =localStorage.getItem('checkLogin');
 

}
async ChangeLoginStatus(){
  
  await localStorage.setItem('checkLogin', "false");
}
}
