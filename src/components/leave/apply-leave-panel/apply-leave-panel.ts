import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common'; 
import {Employee} from '../../../domains/employee';
import {AppliedLeave} from '../../../domains/applied-leave';
import {AvailableLeaveCount} from '../../../domains/available-leave-count';
import {LeaveService} from '../../../services/leave-service';
import {EmployeeService} from '../../../services/employee-service';
import {AfterContentInit} from 'angular2/core';
import {CloneService} from '../../../services/clone-service';
import {PublicHolidaysComponent} from '../../public-holidays/public-holidays';
import {AlertComponent, BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
declare var moment: any; //This is needed to make Typescript "happy". Ref: http://stackoverflow.com/a/35166209

/**
 * This component is intended to be used both to apply leave and process the applied leaves by a manager.
 */
@Component({
  selector: 'apply-leave',
  templateUrl: 'apply-leave-panel.tpl.html',
  directives: [PublicHolidaysComponent, AlertComponent, BUTTON_DIRECTIVES]
})
export class ApplyLeavePanelComponent {
  private availableLeaves:AvailableLeaveCount;
  private countCopy:AvailableLeaveCount;
  private appliedLeave:AppliedLeave; //this will hold the new leave being applied or the existing leave being edited
  private leaveCopy:AppliedLeave; //holds a copy of "appliedLeave" field, to be used to clear the changes.
  private allLeaveTypes:Array<string> = ["Borrowed", "Compensatory Off", "Leave Without Pay", "Maternity", "Paternity", "Planned", "Unplanned"];
  private loggedInEmployeeId;
  
  // some flags to show alerts in UI on various conditions
  private areDatesValid:boolean = true;
  private leaveOpenedByManager = false;
  private isExistingLeave = false;
  private areLeavesAvailable = true;
  private leaveAppliedSuccessfully = false;
  private errorWhileSavingLeave = false;
  
  constructor(
    private leaveService:LeaveService, 
    private employeeService:EmployeeService, 
    private leaveCloneService:CloneService<AppliedLeave>,
    private countCloneService:CloneService<AvailableLeaveCount>) {
  }
  
  ngOnInit() {
    this.loggedInEmployeeId = this.employeeService.getLoggedInEmployeeId();  
    this.appliedLeave = this.createNewLeaveApplication();
    this.leaveCopy = this.leaveCloneService.clone(this.appliedLeave);
    this.leaveService.getAvailableLeaves(this.loggedInEmployeeId).subscribe(a => {
      this.availableLeaves = a;
      this.countCopy = this.countCloneService.clone(a);
    });
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
    this.areDatesValid = this.validateDates();

    if(this.areDatesValid) {
      
      if(this.countAppliedLeaves()) {
        this.leaveService.applyForLeave(this.appliedLeave).subscribe(
          s => this.leaveAppliedSuccessfully = true, 
          e => this.errorWhileSavingLeave = true);
      }
    }
  }
  
  reset() {
    this.appliedLeave = this.leaveCloneService.clone(this.leaveCopy);
    this.availableLeaves = this.countCloneService.clone(this.countCopy);
    this.areDatesValid = true;
    this.areLeavesAvailable = true;
    this.errorWhileSavingLeave = false;
    this.leaveAppliedSuccessfully = false;
  }
  
  process(status:string) {
    this.appliedLeave.leaveStatus = status;
    
    // TODO when leaves are cancelled, available leave count must be updated.
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
   * 
   * Returns true if the applied leave is valid on all counts.
   */
  countAppliedLeaves():boolean {
    let leaveFrom = moment(this.appliedLeave.leaveFrom);
    let leaveTo = moment(this.appliedLeave.leaveTo);
    this.appliedLeave.leaveDuration = 0;
    this.appliedLeave.noOfWorkingDays = 0;   
    
    // when both start and end dates are the same
    if(leaveFrom.isSame(leaveTo)) {
      if(this.isWorkingDay(leaveFrom)) {
        this.appliedLeave.leaveDuration += 1;

        if(this.appliedLeave.leaveFromHalf === "First" && this.appliedLeave.leaveToHalf === "Second") {
          this.appliedLeave.noOfWorkingDays = 1;
        }
        else
          this.appliedLeave.noOfWorkingDays = 0.5;
      }     
    }
    else {
      // add count for start date
      let currentDate = moment(leaveFrom);
      if(this.isWorkingDay(currentDate)) {
        this.appliedLeave.leaveDuration += 1;
        if(this.appliedLeave.leaveFromHalf === "First") {
          this.appliedLeave.noOfWorkingDays = 1;
        }
        else
          this.appliedLeave.noOfWorkingDays = 0.5;
      }       
      
      // add count for intermediate days
      currentDate = currentDate.add(1, 'days');
      while(currentDate.isBefore(leaveTo)) {
        this.appliedLeave.leaveDuration += 1;
        if(this.isWorkingDay(currentDate)) {
          this.appliedLeave.noOfWorkingDays += 1;            
        }
        currentDate = currentDate.add(1, 'days');
      }
      
      // add leave for end date
      if(this.isWorkingDay(currentDate)) {
        this.appliedLeave.leaveDuration += 1;
        if(this.appliedLeave.leaveToHalf === "Second") {
          this.appliedLeave.noOfWorkingDays += 1;
        }
        else
          this.appliedLeave.noOfWorkingDays += 0.5;
      }     
    }
    
    return this.appliedLeave.noOfWorkingDays > 0 && this.areLeavesAvailableForSelectedType();
  }
  
  /**
   * Method to check available leave count for planned/unplanned/compoff/borrowable to decide the employee has suffecient no of leaves left.
   * If leaves are available, deduct them from available leave count. 
   * This method also sets the "areLeavesAvailable" flag.
   */
  areLeavesAvailableForSelectedType():boolean {
    let result = false;
    
    if(this.appliedLeave.leaveType === "Planned") {
      if(this.availableLeaves.planned >= this.appliedLeave.noOfWorkingDays) {
        result = true;
        this.availableLeaves.planned -= this.appliedLeave.noOfWorkingDays;
      }      
    }
    else if(this.appliedLeave.leaveType === "Unplanned") {
      if(this.availableLeaves.unplanned >= this.appliedLeave.noOfWorkingDays) {
        result = true;
        this.availableLeaves.unplanned -= this.appliedLeave.noOfWorkingDays;
      } 
    }
    else if(this.appliedLeave.leaveType === "Compensatory Off") {
      if(this.availableLeaves.compOff >= this.appliedLeave.noOfWorkingDays) {
        result = true;
        this.availableLeaves.compOff -= this.appliedLeave.noOfWorkingDays;
      } 
    }
    else if(this.appliedLeave.leaveType === "Borrowed") {
      if(this.availableLeaves.borrowable >= this.appliedLeave.noOfWorkingDays) {
        result = true;
        this.availableLeaves.borrowable = 0; // you can only borrow once
      }
    }
    else
      result = true;
      
    this.areLeavesAvailable = result;
    return result;  
  }
  
  isWorkingDay(date:any):boolean {
    return (!(date.isoWeekday() == 6 || date.isoWeekday() == 7 || this.leaveService.isPublicHoliday(date)));
  }
}