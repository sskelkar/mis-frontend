import {Component} from 'angular2/core';
import {Employee} from '../../domains/employee';
import {EmployeeService} from '../../services/employee-service';

@Component({
  selector: 'employee-editor',
  templateUrl : `employee-editor.tpl.html`,
  providers: [EmployeeService]
})
export class EmployeeEditorComponent {
  employee:Employee = <Employee>{};
  
  constructor(private employeeService:EmployeeService) {
    this.employeeService.getEmployeeById(21).subscribe(employee => {this.employee = employee});
  }
  
  save(employee:Employee) {
    this.employeeService.updateEmployee(employee).subscribe();
  }
}