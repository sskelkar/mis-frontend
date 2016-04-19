import {Component} from 'angular2/core';
import {Employee} from '../../../domains/employee';
import {AvailableLeaveCount} from '../../../domains/available-leave-count';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';

@Component({
  selector: 'available-leaves',
  templateUrl: 'available-leaves.tpl.html'
})
export class AvailableLeavesComponent {
  private available:AvailableLeaveCount;
  
  constructor(private leaveService:LeaveService, private employeeService:EmployeeService) {
  }
  
  ngOnInit() {
    this.leaveService.getAvailableLeaves(this.employeeService.getLoggedInEmployeeId()).subscribe(a => this.available = a);
  }
}