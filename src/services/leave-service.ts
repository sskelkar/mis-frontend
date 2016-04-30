import {Employee} from '../domains/employee';
import {AvailableLeaveCount} from '../domains/available-leave-count';
import {AppliedLeave} from '../domains/applied-leave';
import {PublicHoliday} from '../domains/public-holiday';
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var moment: any; //This is needed to make Typescript "happy". Ref: http://stackoverflow.com/a/35166209

@Injectable() 
export class LeaveService {
  private leaveServiceUrl = 'http://localhost:72/mis/leave';
  private allLeaveTypes:Array<string>;
  private allLeaveStatuses:Array<string>;  
  private publicHolidays:Array<PublicHoliday> = [];
  
  constructor(private http:Http) {
    
  }
  
  getAvailableLeaves(id:any):Observable<AvailableLeaveCount> {
    let url = this.leaveServiceUrl + "/available?employeeId=" + id;
    return this.http.get(url).map(res => res.json());
  }
  
  getAvailableLeavesNew(id:any):Observable<Array<AvailableLeaveCount>> {
    let url = this.leaveServiceUrl + "/availableNew?employeeId=" + id;
    console.log("returned " + this.http.get(url));
    return this.http.get(url).map(res => res.json());
  }
  
  getEmployeeLeavesHistory(id:any):Observable<Array<AppliedLeave>>{
    let url = this.leaveServiceUrl + "/history?employeeId=" + id;
    return this.http.get(url).map(res =>res.json());
  }
  /**
   * Method to fetch public holidays from leave-service. The fetched leaves will be stored in publicHolidays variable. The same values will be returned on each subsequent invocation.
   */
  getAllHolidays():Array<PublicHoliday> {    
    if(this.publicHolidays.length == 0)
      this.http.get(this.leaveServiceUrl + '/holiday').map(res => res.json()).subscribe(list => this.publicHolidays = list);
    return this.publicHolidays;
  }
  
  isPublicHoliday(date:Date):boolean {
    let result = false;
    let input = moment(date);
    
    this.publicHolidays.forEach(publicHoliday => {
      if(moment(publicHoliday.holidayDate).isSame(input)) {
        result = true;
      }        
    });
    return result;
  }
  
  applyForLeave(leave:AppliedLeave) {
    let url = this.leaveServiceUrl + "/apply"
    let json = JSON.stringify(leave);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    return this.http.put(url, json, {headers});
  }
}