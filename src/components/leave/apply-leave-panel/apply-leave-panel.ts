import {Component} from 'angular2/core';
import {Employee} from '../../../domains/employee';
import {AppliedLeave} from '../../../domains/applied-leave';
import {AvailableLeaveCount} from '../../../domains/available-leave-count';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AfterContentInit} from 'angular2/core';
@Component({
  selector: 'apply-leave',
  templateUrl: 'apply-leave-panel.tpl.html',
  directives: [DROPDOWN_DIRECTIVES, DATEPICKER_DIRECTIVES]
})
export class ApplyLeavePanelComponent {
  private available:AvailableLeaveCount;
  private appliedLeave:AppliedLeave;
  private allLeaveTypes:Array<string> = new Array();
  
  isOn = false;
  isDisabled = false;
    
  constructor(private leaveService:LeaveService, private employeeService:EmployeeService) {
  }
  
  setDefaultLeave() {
    let currentDate = new Date();
    
    this.appliedLeave = new AppliedLeave();
    this.appliedLeave.applicationDate = currentDate;
    this.appliedLeave.leaveFromHalf = "first";
    this.appliedLeave.leaveToHalf = "second";
    this.appliedLeave.leaveFrom = currentDate;
    this.appliedLeave.leaveTo = currentDate;    
    this.appliedLeave.leaveType = "Planned";    
  }
  
  isLeaveDurationValid():boolean {
    return false;
  }
  
  save() {
    
  }
  
  cancel() {
    this.setDefaultLeave();
  }
  
  ngOnInit() {
    this.setDefaultLeave();
    
    let loggedInEmployeeId = this.employeeService.getLoggedInEmployeeId();    
    this.leaveService.getAvailableLeaves(loggedInEmployeeId).subscribe(a => this.available = a);
   
  }
}