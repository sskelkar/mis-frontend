import {Component} from 'angular2/core'
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {LeaveService} from '../../../services/leave-service';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {AvailableLeavesComponent} from '../available-leaves/available-leaves'

@Component({
  selector: 'leave-panel',
  templateUrl: 'leave-panel.tpl.html',
  directives: [AvailableLeavesComponent],
  providers: [LeaveService]
})
export class LeavePanelComponent {
  private loggedInEmployee:Employee;

  constructor(private employeeService:EmployeeService) {
    console.log("leave panel constructor");
  }
  
  ngOnInit() {
    console.log("leave panel init");
    this.employeeService.getLoggedInEmployee().subscribe(e => this.loggedInEmployee = e);
  }
}