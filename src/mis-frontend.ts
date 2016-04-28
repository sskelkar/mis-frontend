/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {LoginComponent} from './components/login/login'
import {HomePanelComponent} from './components/home/home-panel'
import {Type} from "angular2/core";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Response} from "angular2/http";
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {EmployeeService} from './services/employee-service';
import {LeaveService} from './services/leave-service';
//For some reason Intellij throws errors if the component does not have in front of it.
@Component({
  selector: 'mis-frontend',
  templateUrl: 'mis-frontend.tpl.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, EmployeeService, LeaveService]
})
@RouteConfig([
  {
    path: '/', 
    name: 'Login', 
    component: LoginComponent
  }, 
  {
    path: '/employee/:id/...',  
    name: 'HomePanel', 
    component: HomePanelComponent
  }
])
export class MisFrontend{
  constructor(leaveService:LeaveService) {
    //The following method is being called here so that public holidays will be fetched from backend service and cached in LeaveService. The same values can be used throughout the application
    // without having to make another network call.
    leaveService.getAllHolidays();
  }
}

bootstrap(<Type>MisFrontend, [ROUTER_PROVIDERS]);
