import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, RouteParams} from 'angular2/router';
import {EmployeeDetailComponent} from '../../components/employee-detail/employee-detail'
import {EmployeeEditorComponent} from '../../components/employee-editor/employee-editor'
import {EmployeeService} from '../../services/employee-service';
 
@Component({
  selector: 'logged-in-employee',
  templateUrl : `logged-in-employee.tpl.html`,
  directives: [RouterOutlet],
  providers: [EmployeeService]
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
  }
])
export class LoggedInEmployeeComponent {
  constructor(private employeeService:EmployeeService, private routeParams:RouteParams) {
    
  }
  
  ngOnInit() {
    console.log("setting id: "+this.routeParams.get('id'));
    this.employeeService.setLoggedInEmployeeId(this.routeParams.get('id'));
  }
}