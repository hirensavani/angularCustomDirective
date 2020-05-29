import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MyCurrencyFormatterDirective } from "./currency.directive";
import { MyCurrencyPipe } from "./currency.pipe";


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MyCurrencyFormatterDirective, MyCurrencyPipe ],
  bootstrap:    [ AppComponent ],
  providers: [MyCurrencyPipe]
})
export class AppModule { }
