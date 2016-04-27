import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common'; 
import {Employee} from '../../../domains/employee';
import {AppliedLeave} from '../../../domains/applied-leave';
import {AvailableLeaveCount} from '../../../domains/available-leave-count';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';
import {AfterContentInit} from 'angular2/core';
import {CloneService} from '../../../services/clone-service';
declare var moment: any; //This is needed to make Typescript "happy". Ref: http://stackoverflow.com/a/35166209

/**
 * This component is intended to be used both to apply leave and process the applied leaves by a manager.
 */
@Component({
  selector: 'apply-leave',
  templateUrl: 'apply-leave-panel.tpl.html'
})
export class ApplyLeavePanelComponent {
  private availableLeaves:AvailableLeaveCount;
  private appliedLeave:AppliedLeave; //this will hold the new leave being applied or the existing leave being edited
  private copy:AppliedLeave; //holds a copy of "appliedLeave" field, to be used to clear the changes.
  private allLeaveTypes:Array<string> = ["Borrowed", "Compensatory Off", "Planned", "Unplanned"];
  private loggedInEmployeeId;
  private areDatesValid:boolean = true;
  private leaveOpenedByManager = false;
  
  constructor(
    private leaveService:LeaveService, 
    private employeeService:EmployeeService, 
    private cloneService:CloneService<AppliedLeave>) {
  }
  
  ngOnInit() {
    this.loggedInEmployeeId = this.employeeService.getLoggedInEmployeeId();  
    this.appliedLeave = this.createNewLeaveApplication();
    this.copy = this.cloneService.clone(this.appliedLeave);
    this.leaveService.getAvailableLeaves(this.loggedInEmployeeId).subscribe(a => this.availableLeaves = a);
  }
    
  createNewLeaveApplication():AppliedLeave {
    let currentDate:Date = moment().format("YYYY-MM-DD");
    
    let newLeave = new AppliedLeave();
    newLeave.applicationDate = currentDate;
    newLeave.leaveFromHalf = "First";
    newLeave.leaveToHalf = "Second";
    newLeave.leaveFrom = currentDate;
    newLeave.leaveTo = currentDate;    
    newLeave.leaveType = "Planned";
    newLeave.employeeId = this.loggedInEmployeeId;
    newLeave.leaveStatus = "Pending";
    return newLeave;
  }
   
  apply() {
    console.log("applying!");
    this.areDatesValid = this.validateDates();
    console.log(this.areDatesValid);
    // this.appliedLeave.leaveDuration = ?
    // this.appliedLeave.noOfWorkingDays = ?
    
  }
  
  clear() {
    this.appliedLeave = this.cloneService.clone(this.copy);
    this.areDatesValid = true;
  }
  
  process(status:string) {
    this.appliedLeave.leaveStatus = status;
  }
  
  /**
   * Dates are invalid if "leave from"" is after "leave to". If leave from and to are same date, then leaveFromHalf cannot be after leaveToHalf.
   */
  validateDates():boolean {
    let leaveFrom = moment(this.appliedLeave.leaveFrom);
    let leaveTo = moment(this.appliedLeave.leaveTo);
        
    if(leaveFrom.isAfter(leaveTo))
      return false;
    if(leaveFrom.isSame(leaveTo) && this.appliedLeave.leaveFromHalf === "Second" && this.appliedLeave.leaveToHalf === "First")
      return false;
    else
      return true; 
  }
  
  /**
   * Function to calculate the number of working days for which the leave is being applied. This is calculated by excluding weekends and
   * public holidays from the leave period. Then we need to check if sufficient number of leaves of the type being applied for is available for
   * this employee.
   */
  verifyLeaveCount():number {
    let leaveFrom = moment(this.appliedLeave.leaveFrom);
    let leaveTo = moment(this.appliedLeave.leaveTo);
    let leaveDuration = 0;
    let noOfWorkingDays = 0;
    
    
  }
}