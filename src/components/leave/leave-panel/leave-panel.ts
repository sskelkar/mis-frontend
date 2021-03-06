import {Component} from 'angular2/core'
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {LeaveService} from '../../../services/leave-service';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {ApplyLeavePanelComponent} from '../apply-leave-panel/apply-leave-panel'

@Component({
  selector: 'leave-panel',
  templateUrl: 'leave-panel.tpl.html',
  directives: [ApplyLeavePanelComponent]
})
export class LeavePanelComponent {
  //private loggedInEmployee:Employee;

  constructor(private employeeService:EmployeeService) {
  }
  
  ngOnInit() {
    //this.employeeService.getLoggedInEmployee().subscribe(e => this.loggedInEmployee = e);
  }
}