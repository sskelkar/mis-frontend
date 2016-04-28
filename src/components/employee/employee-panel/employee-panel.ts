import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {EmployeeDetailComponent} from '../employee-detail/employee-detail'
import {EmployeeEditorComponent} from '../employee-editor/employee-editor'
import {EmployeeLeaveHistoryComponent} from '../employee-leave-history/employee-leave-history'
import {PasswordEditorComponent} from '../employee-editor/password-editor'
import {LeavePanelComponent} from '../../leave/leave-panel/leave-panel';
import {EmployeeService} from '../../../services/employee-service';
import {Employee} from '../../../domains/employee';
 
@Component({
  selector: 'employee-panel',
  templateUrl : `employee-panel.tpl.html`,
  directives: [RouterOutlet, ROUTER_DIRECTIVES]
})
@RouteConfig ([
  {
    path: '/',  
    name: 'EmployeeDetail', 
    component: EmployeeDetailComponent,
    useAsDefault: true
  },
  {
    path: '/edit', 
    name: 'EmployeeEditor', 
    component: EmployeeEditorComponent
  },
  {
    path: '/changepassword', 
    name: 'PasswordEditor', 
    component: PasswordEditorComponent
  },
  {
    path: '/leaves', 
    name: 'LeavePanel', 
    component: LeavePanelComponent
  },
  {
    path: '/history', 
    name: 'EmployeeHistory', 
    component: EmployeeLeaveHistoryComponent
  }  
])
export class EmployeePanelComponent {
  private loggedInEmployee:Employee = <Employee>{};
  constructor(private employeeService:EmployeeService) {
    
  }
  
  ngOnInit() {
     this.employeeService.getLoggedInEmployee().subscribe(e => this.loggedInEmployee = e);
  }
}