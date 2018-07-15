import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MyCurrencyFormatterDirective } from "./app.directive";
import { MyCurrencyFormatterDirective1 } from "./app1.directive";
import { MyCurrencyPipe } from "./app.pipe";


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MyCurrencyFormatterDirective, MyCurrencyPipe, MyCurrencyFormatterDirective1 ],
  bootstrap:    [ AppComponent ],
  providers: [MyCurrencyPipe]
})
export class AppModule { }
