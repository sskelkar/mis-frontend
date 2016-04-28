import {Component} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {CloneService} from '../../../services/clone-service';
import {Alert, BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
  selector: 'password-editor',
  templateUrl : `password-editor.tpl.html`,
  providers: [CloneService],
  directives: [Alert, ROUTER_DIRECTIVES, BUTTON_DIRECTIVES]
})
export class PasswordEditorComponent {
  employee:Employee = <Employee>{};
  copy:Employee = <Employee>{};
  newPassword: string;
  confirmPassword: string;
    private passwordMatch: number = 0;

  constructor(private employeeService:EmployeeService, private cloneService:CloneService<Employee>, private router:Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.employeeService.getLoggedInEmployee().subscribe(e => {
      this.employee = e;
      this.copy = this.cloneService.clone(this.employee);      
    });
  } 
   
  save() {
    if(this.newPassword == this.confirmPassword) {
      this.passwordMatch = 1;
      this.employee.password = this.newPassword;
      this.employeeService.updateEmployee(this.employee).subscribe( () => this.router.navigate(['EmployeeEditor']));
    }
    else {
      this.passwordMatch = -1; // invalid password
    }
  }
  
  cancel() {
    this.employee = this.cloneService.clone(this.copy);
    this.router.navigate(['EmployeeEditor']);
  }
}