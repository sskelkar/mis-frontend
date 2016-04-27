import {Employee} from '../domains/employee';
import {AvailableLeaveCount} from '../domains/available-leave-count';
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
  
  constructor(private http:Http) {
    
  }
  
  getAvailableLeaves(id:any):Observable<AvailableLeaveCount> {
    let url = this.leaveServiceUrl + "/available?employeeId=" + id;
    return this.http.get(url).map(res => res.json());
  }
}