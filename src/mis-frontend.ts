/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {MyComponent} from './components/mycomponent/mycomponent'
import {Type} from "angular2/core";
import {Component} from "angular2/core";

//For some reason Intellij throws errors if the component does not have in front of it.
@Component({
  selector: 'mis-frontend',
  directives: [<Type>MyComponent],
  templateUrl: 'mis-frontend.tpl.html'
})
export class MisFrontend{}

bootstrap(<Type>MisFrontend);
