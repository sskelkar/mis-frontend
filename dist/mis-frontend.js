/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
System.register(['angular2/platform/browser', './components/mycomponent/mycomponent', "angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, mycomponent_1, core_1;
    var MisFrontend;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (mycomponent_1_1) {
                mycomponent_1 = mycomponent_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //For some reason Intellij throws errors if the component does not have in front of it.
            MisFrontend = (function () {
                function MisFrontend() {
                }
                MisFrontend = __decorate([
                    core_1.Component({
                        selector: 'mis-frontend',
                        directives: [mycomponent_1.MyComponent],
                        template:'<my-component #input></my-component><br>Hello {{input.name}}'
                    }), 
                    __metadata('design:paramtypes', [])
                ], MisFrontend);
                return MisFrontend;
            }());
            exports_1("MisFrontend", MisFrontend);
            browser_1.bootstrap(MisFrontend);
        }
    }
});

//# sourceMappingURL=mis-frontend.js.map
