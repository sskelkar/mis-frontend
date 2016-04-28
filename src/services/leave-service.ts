import {Employee} from '../domains/employee';
import {AvailableLeaveCount} from '../domains/available-leave-count';

import {AppliedLeave} from '../domains/applied-leave';
import {PublicHoliday} from '../domains/public-holiday';
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
    return this.http.get(this.leaveServiceUrl + "/available?employeeId=" + id).map(res => res.json());
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
}