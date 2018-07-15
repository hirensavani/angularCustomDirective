import { Component } from '@angular/core';
import { MyCurrencyFormatterDirective } from "./app.directive";
import { MyCurrencyFormatterDirective1 } from "./app1.directive";

@Component({
  selector: 'my-app',
  templateUrl: `./app.component.html`,
})
export class AppComponent  { 
  name = 'Angular';

  
}
