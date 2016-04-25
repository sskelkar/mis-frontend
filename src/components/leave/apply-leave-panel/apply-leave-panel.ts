import {Component} from 'angular2/core';
import {Employee} from '../../../domains/employee';
import {AppliedLeave} from '../../../domains/applied-leave';
import {AvailableLeaveCount} from '../../../domains/available-leave-count';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AfterContentInit} from 'angular2/core';

/**
 * This component is intended to be used both to apply leave and process the applied leaves by a manager.
 */
@Component({
  selector: 'apply-leave',
  templateUrl: 'apply-leave-panel.tpl.html',
  directives: [DATEPICKER_DIRECTIVES]
})
export class ApplyLeavePanelComponent {
  private available:AvailableLeaveCount;
  private appliedLeave:AppliedLeave;
  private allLeaveTypes:Array<string> = ["Borrowed", "Compensatory Off", "Planned", "Unplanned"];
  private loggedInEmployeeId;
  
  constructor(private leaveService:LeaveService, private employeeService:EmployeeService) {
  }
  
  setDefaultLeave() {
    let currentDate = new Date();
    
    let newLeave = new AppliedLeave();
    newLeave.applicationDate = currentDate;
    newLeave.leaveFromHalf = "First";
    newLeave.leaveToHalf = "Second";
    newLeave.leaveFrom = currentDate;
    newLeave.leaveTo = currentDate;    
    newLeave.leaveType = "Planned";
    
    this.appliedLeave = newLeave;
  }
  
  isLeaveDurationValid():boolean {
    return false;
  }
  
  apply() {
    console.log("applying!");
    this.appliedLeave.employeeId = this.loggedInEmployeeId;
    // this.appliedLeave.leaveDuration = ?
    // this.appliedLeave.noOfWorkingDays = ?
    this.appliedLeave.leaveStatus = "Pending";
  }
  
  clear() {
    this.setDefaultLeave();
  }
  
  process(status:string) {
    this.appliedLeave.leaveStatus = status;
  }
  
  ngOnInit() {
    this.setDefaultLeave();
    
    this.loggedInEmployeeId = this.employeeService.getLoggedInEmployeeId();    
    this.leaveService.getAvailableLeaves(this.loggedInEmployeeId).subscribe(a => this.available = a);   
  }
}