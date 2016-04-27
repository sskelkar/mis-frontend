import {Component} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {Employee} from '../../../domains/employee';
import {EmployeeService} from '../../../services/employee-service';
import {CloneService} from '../../../services/clone-service';
import {ContenteditableModel} from '../../models/contenteditable-model';
import {Router} from 'angular2/router';
import {BUTTON_DIRECTIVES,  DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'employee-editor',
  templateUrl : `employee-editor.tpl.html`,
  providers: [CloneService],
  directives: [BUTTON_DIRECTIVES, DROPDOWN_DIRECTIVES, ContenteditableModel]
})
export class EmployeeEditorComponent {
  employee:Employee = <Employee>{};
  copy:Employee = <Employee>{};
  public radioModel:string = 'Middle';
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public items:Array<string> = ['O-','O+','A-','A+','B-','B+','AB-','AB+'];  
  constructor(private employeeService:EmployeeService, private cloneService:CloneService<Employee>, private router:Router, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.employeeService.getLoggedInEmployee().subscribe(e => {
      this.employee = e;
      this.copy = this.cloneService.clone(this.employee);      
    });
  } 
   
  save() {
    this.employeeService.updateEmployee(this.employee).subscribe( () => this.router.navigate(['EmployeeDetail']));
  }
  
  cancel() {
    this.employee = this.cloneService.clone(this.copy);
    this.router.navigate(['EmployeeDetail']);
  }
  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  

}