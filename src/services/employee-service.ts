import {Employee} from '../domains/employee';
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class EmployeeService {
  private employeeServiceUrl = 'http://localhost:71/mis/employee';
  
  constructor(private http:Http) {
    
  }
  
  public getEmployees():Observable<Array<Employee>> {
    // return this.http.get(this.employeeServiceUrl)
    //   .map(res => <Employee[]>res.json().data);
    return this.http.get(this.employeeServiceUrl).map(res => res.json());
  }      
  
  public getEmployeeById(id:any):Observable<Employee> {
    let url = this.employeeServiceUrl + '/' + id;
    return this.http.get(url)
      .map(res => res.json());
      //.catch(Observable.empty);    //TODO handle this properly
  }
  
  public updateEmployee(employee:Employee) {
    let url = this.employeeServiceUrl + '/' + employee.employeeId;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let json = JSON.stringify(employee);
    return this.http.put(url, json, {headers});
  }
  // private handleError (error: Response) {
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }                
}