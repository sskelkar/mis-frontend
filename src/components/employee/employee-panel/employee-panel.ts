import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {EmployeeDetailComponent} from '../employee-detail/employee-detail'
import {EmployeeEditorComponent} from '../employee-editor/employee-editor'
import {EmployeeLeaveHistoryComponent} from '../employee-leave-history/employee-leave-history'
import {PasswordEditorComponent} from '../employee-editor/password-editor'
import {LeavePanelComponent} from '../../leave/leave-panel/leave-panel';
import {WelcomePanelComponent} from '../../welcome-panel/welcome-panel';
import {EmployeeService} from '../../../services/employee-service';
import {Employee} from '../../../domains/employee';
import {BookingPanelComponent} from '../../room/booking-panel/booking-panel';
import {RoomPanelComponent} from '../../room/room-panel/room-panel';

@Component({
  selector: 'employee-panel',
  templateUrl : `employee-panel.tpl.html`,
  directives: [RouterOutlet, ROUTER_DIRECTIVES]
})
@RouteConfig ([
  {
    path: '/',  
    name: 'WelcomePanel', 
    component: WelcomePanelComponent,
    useAsDefault: true
  },  
  {
    path: '/detail',  
    name: 'EmployeeDetail', 
    component: EmployeeDetailComponent
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
  },
  {
    path: '/room',  
    name: 'RoomPanel', 
    component: RoomPanelComponent
  },
  {
    path: '/room/:roomId/book',  
    name: 'NewBookingPanel', 
    component: BookingPanelComponent
  },
  {
    path: '/room/booking/:bookingId',  
    name: 'ExistingBookingPanel', 
    component: BookingPanelComponent
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