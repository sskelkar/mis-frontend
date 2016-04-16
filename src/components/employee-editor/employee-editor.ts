import {Component} from 'angular2/core';
import {Employee} from '../../domains/employee';
import {EmployeeService} from '../../services/employee-service';
import {CloneService} from '../../services/clone-service';

@Component({
  selector: 'employee-editor',
  templateUrl : `employee-editor.tpl.html`,
  providers: [EmployeeService, CloneService]
})
export class EmployeeEditorComponent {
  employee:Employee = <Employee>{};
  copy:Employee = <Employee>{};
  
  constructor(private employeeService:EmployeeService, private cloneService:CloneService<Employee>) {
    this.employeeService.getEmployeeById(21).subscribe(employee => {
      this.employee = employee; 
      this.copy = this.cloneService.clone(this.employee);
    });
  }
  
  save() {
    this.employeeService.updateEmployee(this.employee).subscribe(
      // navigate back to details page
    );
  }
  
  cancel() {
    this.employee = this.cloneService.clone(this.copy);
  }
  

}