import {bootstrap, Component, View} from 'angular2/angular2';
import {MyComponent} from "./components/mycomponent/mycomponent";

@Component({
  selector: 'mis-frontend'
})
@View({
  directives: [MyComponent],
  templateUrl: 'mis-frontend.tpl.html'
})
class MisFrontend{}

bootstrap(MisFrontend, []);
