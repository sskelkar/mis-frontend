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
  
  constructor(private http:Http) {
    
  }
  
  getAvailableLeaves(id:any):Observable<AvailableLeaveCount> {
    let url = this.leaveServiceUrl + "/available?employeeId=" + id;
    console.log(url);
    return this.http.get(this.leaveServiceUrl + "/available?employeeId=" + id).map(res => res.json());
  }
}