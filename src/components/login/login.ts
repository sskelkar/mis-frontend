import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'login',
  templateUrl: `login.tpl.html`
})
export class LoginComponent {
  private loggedInUserId:number = 0;
  
  constructor(private router:Router) {
    
  }
  
  login(username:String, password:String) {
    // TODO: implement this properly!
    if(username == "s" && password == "s") {
      this.loggedInUserId = 21;
      this.router.navigate(['EmployeePanel', {id: 21}]);
    }
    else {
      this.loggedInUserId = -1; // invalid login
    }
  }
}