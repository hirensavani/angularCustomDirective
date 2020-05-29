import { Component } from '@angular/core';
import { MyCurrencyFormatterDirective } from "./currency.directive";

@Component({
  selector: 'my-app',
  templateUrl: `./app.component.html`,
})
export class AppComponent  { 
  name = 'Custom Directive MBK Formatter';
}
