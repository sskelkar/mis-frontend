/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {LoginComponent} from './components/login/login'
import {LoggedInEmployeeComponent} from './components/logged-in-employee/logged-in-employee'
import {Type} from "angular2/core";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Response} from "angular2/http";
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

//For some reason Intellij throws errors if the component does not have in front of it.
@Component({
  selector: 'mis-frontend',
  templateUrl: 'mis-frontend.tpl.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})
@RouteConfig([
  {
    path: '/', 
    name: 'Login', 
    component: LoginComponent
  }, 
  {
    path: '/employee/:id/...',  
    name: 'LoggedInEmployee', 
    component: LoggedInEmployeeComponent
  }
])
export class MisFrontend{
  
}

bootstrap(<Type>MisFrontend, [ROUTER_PROVIDERS]);
