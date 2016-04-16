import {Component} from 'angular2/core';
import {Employee} from '../../domains/employee';
import {EmployeeService} from '../../services/employee-service';
import {RouteParams, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'employee-detail',
    templateUrl : `employee-detail.tpl.html`,
    directives: [ROUTER_DIRECTIVES],
    providers: [EmployeeService, ROUTER_PROVIDERS]
})
export class EmployeeDetailComponent {
    private employee:Employee;
    
    constructor(employeeService:EmployeeService, routeParams: RouteParams) { 
    //   employeeService.getEmployeeById(routeParams.get('id')).subscribe(employee => {this.employee = employee});
      employeeService.getEmployeeById(21).subscribe(employee => {this.employee = employee});    
    }
}