import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {EmployeePanelComponent} from '../employee/employee-panel/employee-panel';
import {EmployeeService} from '../../services/employee-service';
import {Employee} from '../../domains/employee';

 
@Component({
  selector: 'home-panel',
  templateUrl : `home-panel.tpl.html`,
  directives: [RouterOutlet, ROUTER_DIRECTIVES]
})
@RouteConfig ([
  {
    path: '/...',  
    name: 'EmployeePanel', 
    component: EmployeePanelComponent,
    useAsDefault: true
  }  
])
export class HomePanelComponent {
  private loggedInEmployee:Employee = <Employee>{};
  constructor(private employeeService:EmployeeService, private routeParams:RouteParams) {
    
  }
  
  ngOnInit() {
    this.employeeService.setLoggedInEmployeeId(this.routeParams.get('id')).subscribe(e => {
      this.loggedInEmployee = e;
    });
  }
  
  logout() {
    
  }
}