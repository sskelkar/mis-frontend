import {Component} from 'angular2/core';
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'employee-detail',
    templateUrl : 'employee-detail.tpl.html',
    directives: [ROUTER_DIRECTIVES ]
})
export class EmployeeDetailComponent {
    private employee:Employee;
    
    constructor(private employeeService:EmployeeService) { 
 
    }
    
    ngOnInit() {
      this.employeeService.getLoggedInEmployee().subscribe(e => this.employee = e);
    }
}