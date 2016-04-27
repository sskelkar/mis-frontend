import {Component} from 'angular2/core';
import {Employee} from '../../../domains/employee';
import {ContenteditableModel} from '../../models/contenteditable-model';
import {EmployeeService} from '../../../services/employee-service';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'employee-detail',
    templateUrl : 'employee-detail.tpl.html',
    directives: [ROUTER_DIRECTIVES, ContenteditableModel]
})
export class EmployeeDetailComponent {
    private employee:Employee;
    
    constructor(private employeeService:EmployeeService) { 
 
    }
    
    ngOnInit() {
      this.employeeService.getLoggedInEmployee().subscribe(data => this.employee = data, e => console.log("Network problem while connecting to employee-service"));
    }
}