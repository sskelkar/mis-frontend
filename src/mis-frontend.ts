/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {LoginComponent} from './components/login/login'
import {EmployeeDetailComponent} from './components/employee-detail/employee-detail'
import {EmployeeEditorComponent} from './components/employee-editor/employee-editor' 
import {Type} from "angular2/core";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Response} from "angular2/http";
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

//For some reason Intellij throws errors if the component does not have in front of it.
@Component({
  selector: 'mis-frontend',
  templateUrl: 'mis-frontend.tpl.html',
  directives: [<Type>EmployeeDetailComponent, EmployeeEditorComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
  {
		path: '/', 
		name: 'Login', 
		component: LoginComponent
	},
  {
		path: '/employee/:id', 
		name: 'EmployeeDetail', 
		component: EmployeeDetailComponent
	},
  {
		path: '/employee/:id/edit', 
		name: 'EmployeeEditor', 
		component: EmployeeEditorComponent
	}
])
export class MisFrontend{
  
}

bootstrap(<Type>MisFrontend);
