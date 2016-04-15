import {Component} from 'angular2/core';
import {Employee} from '../../domains/employee';
import {EmployeeService} from '../../services/employee-service';

@Component({
    selector: 'employee-detail',
    templateUrl : `employee-detail.tpl.html`,
    providers: [EmployeeService]
})
export class EmployeeDetailComponent {
    private employee:Employee = new Employee();
    
    constructor(employeeService:EmployeeService) { 
      employeeService.getEmployeeById(21).subscribe(employee => {console.log(employee);this.employee = employee});  
    }
}