import {Component} from 'angular2/core';
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {CloneService} from '../../../services/clone-service';
import {Router} from 'angular2/router';

@Component({
  selector: 'employee-editor',
  templateUrl : `employee-editor.tpl.html`,
  providers: [EmployeeService, CloneService]
})
export class EmployeeEditorComponent {
  employee:Employee = <Employee>{};
  copy:Employee = <Employee>{};
  
  constructor(private employeeService:EmployeeService, private cloneService:CloneService<Employee>, private router:Router) {

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
    this.employee = this.cloneService.clone(this.copy);3
    this.router.navigate(['EmployeeDetail']);
  }
  

}