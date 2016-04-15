/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {EmployeeDetailComponent} from './components/employee-detail/employee-detail'
import {EmployeeEditorComponent} from './components/employee-editor/employee-editor' //remove this
import {Type} from "angular2/core";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Response} from "angular2/http";

//For some reason Intellij throws errors if the component does not have in front of it.
@Component({
  selector: 'mis-frontend',
  directives: [<Type>EmployeeDetailComponent, EmployeeEditorComponent],
  templateUrl: 'mis-frontend.tpl.html'
})
export class MisFrontend{}

bootstrap(<Type>MisFrontend, [HTTP_PROVIDERS]);
