import {Component} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {CloneService} from '../../../services/clone-service';
import {ContenteditableModel} from '../../models/contenteditable-model';
import {Router} from 'angular2/router';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
  selector: 'employee-editor',
  templateUrl : `employee-editor.tpl.html`,
  providers: [CloneService],
  directives: [ROUTER_DIRECTIVES, BUTTON_DIRECTIVES, ContenteditableModel]
})
export class EmployeeEditorComponent {
  employee:Employee = <Employee>{};
  copy:Employee = <Employee>{};
  constructor(private employeeService:EmployeeService, private cloneService:CloneService<Employee>, private router:Router, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.employeeService.getLoggedInEmployee().subscribe(e => {
      this.employee = e;
      this.copy = this.cloneService.clone(this.employee);      
    });
  } 
   
  save() {
    this.employeeService.updateEmployee(this.employee).subscribe( () => this.router.navigate(['EmployeeDetail']));
  }
  
  cancel() {
    this.employee = this.cloneService.clone(this.copy);
    this.router.navigate(['EmployeeDetail']);
  }
}