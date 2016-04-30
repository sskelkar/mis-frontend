import {Component} from 'angular2/core';
import {AppliedLeave} from '../../../domains/applied-leave';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
@Component({
  selector: 'employee-history',
  templateUrl : `employee-leave-history.tpl.html`,
  directives: [PaginationControlsCmp],
  pipes: [PaginatePipe],
  providers: [PaginationService]
})
export class EmployeeLeaveHistoryComponent{
  private appliedLeave:Array<AppliedLeave>;
  
  constructor(private leaveService:LeaveService, private employeeService:EmployeeService){
    
  }
   ngOnInit(){
    this.leaveService.getEmployeeLeavesHistory(this.employeeService.getLoggedInEmployeeId()).subscribe(data => this.appliedLeave = data);
   }
}
