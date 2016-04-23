import {Component} from 'angular2/core';
import {AppliedLeave} from '../../../domains/applied-leave';
import {LeaveService} from '../../../services/leave-service';

@Component({
  selector: 'employee-history',
  templateUrl : `employee-history.tpl.html`,
  providers: [LeaveService]
})
export class EmployeeHistoryComponent{
  private appliedLeave:Array<AppliedLeave>;
  
  constructor(private leaveService:LeaveService){
    
  }
   ngOnInit(){
    this.leaveService.getEmployeeLeavesHistory(21).subscribe(data => this.appliedLeave = data);
   }
}
