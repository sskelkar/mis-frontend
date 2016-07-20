import {Component} from 'angular2/core';
import {AppliedLeave} from '../../../domains/applied-leave';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';
@Component({
  selector: 'employee-history',
  templateUrl : `employee-leave-history.tpl.html`
})
export class EmployeeLeaveHistoryComponent{
  private appliedLeave:Array<AppliedLeave>;
  
  constructor(private leaveService:LeaveService, private employeeService:EmployeeService){
  
  }
  
  ngOnInit(){
    this.leaveService.getEmployeeLeavesHistory(this.employeeService.getLoggedInEmployeeId()).subscribe(data => this.appliedLeave = data);
  }
}
