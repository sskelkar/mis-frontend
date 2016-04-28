import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {EmployeeDetailComponent} from '../employee-detail/employee-detail'
import {EmployeeEditorComponent} from '../employee-editor/employee-editor'
import {EmployeeHistoryComponent} from '../employee-history/employee-history-component'
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
    path: '/leaves', 
    name: 'LeavePanel', 
    component: LeavePanelComponent
  },
  {
    path: '/history', 
    name: 'EmployeeHistory', 
    component: EmployeeHistoryComponent
  }  
])
export class EmployeePanelComponent {
  private loggedInEmployee:Employee = <Employee>{};
  constructor(private employeeService:EmployeeService, private routeParams:RouteParams) {
    
  }
  
  ngOnInit() {
    console.log("setting id: "+this.routeParams.get('id'));
     this.employeeService.getLoggedInEmployee().subscribe(e => { this.loggedInEmployee = e;
    });
  }
}