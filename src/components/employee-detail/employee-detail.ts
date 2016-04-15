import {Component} from 'angular2/core';
import {Employee} from '../../domains/employee';
// import {EmployeeService} from '../../services/employee-service';

@Component({
    selector: 'employee-detail',
    templateUrl : `employee-detail.tpl.html`
    // providers: [EmployeeService]
})
export class EmployeeDetailComponent {
    private employee:Employee;
    
    constructor() {
      this.employee = new Employee();
      this.employee.firstName='sojjwal'
    }
    
    // constructor(employeeService:EmployeeService) {
    //   this.employee.firstName='sojjwal'
    // }
}