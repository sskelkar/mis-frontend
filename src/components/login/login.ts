import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Alert, BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'login',
  templateUrl: `login.tpl.html`,
  directives: [Alert, BUTTON_DIRECTIVES]
})
export class LoginComponent {
  private loggedInUserId:number = 0;
  
  constructor(private router:Router) {
    
  }
  
  login(username:String, password:String) {
    // TODO: implement this properly!
    if(username == "s" && password == "s") {
      this.loggedInUserId = 21;
      this.router.navigate(['HomePanel', {id: this.loggedInUserId}]);
    }
    else {
      this.loggedInUserId = -1; // invalid login
    }
  }
}