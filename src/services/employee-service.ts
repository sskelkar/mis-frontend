import {Employee} from '../domains/employee'
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'

@Injectable() 
export class EmployeeService {
  private employeeServiceUrl = 'http://localhost:71/mis/employee';
  
  constructor(private http:Http) {
    
  }
  
  public getEmployees() {
    return this.http.get(this.employeeServiceUrl)
      .map(res => <Employee[]> res.json().data)
      .catch(this.handleError);
  }      
  
  public getEmployeeById(id:number) {
    let url:string = this.employeeServiceUrl + '/' + id;
    return this.http.get(url)
      .map(res => <Employee> res.json().data)
      .catch(this.handleError);    
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }                
}