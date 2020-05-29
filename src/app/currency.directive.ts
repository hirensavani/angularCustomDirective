
import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { MyCurrencyPipe } from "./currency.pipe";

@Directive({ selector: "[myCurrencyFormatter]" })
export class MyCurrencyFormatterDirective implements OnInit {

  @Input() decimalSize: number = 0;
  @Input() thousandSeprator: boolean = false;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Del', 'Right', 'Left', 'Decimal'];
  private ele: HTMLInputElement;
  private regex: any;

  constructor(private elementRef: ElementRef, private currencyPipe: MyCurrencyPipe) {
    this.ele = this.elementRef.nativeElement;
  }

  ngOnInit() {
    //this.el.value = this.currencyPipe.transform(this.el.value);
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1 ||
      //Allow Ctrl + A
      (event.keyCode === 65 && (event.ctrlKey) || (event.metaKey)) ||

      //Allow Ctrl + C
      (event.keyCode === 67 && (event.ctrlKey) || (event.metaKey)) ||

      //Allow Ctrl + V
      (event.keyCode === 86 && (event.ctrlKey) || (event.metaKey)) ||

      //Allow Ctrl + X
      (event.keyCode === 88 && (event.ctrlKey) || (event.metaKey)) ||

      //Allow Ctrl + Z
      (event.keyCode === 90 && (event.ctrlKey) || (event.metaKey)) ||

      //Allow Ctrl + Y
      (event.keyCode === 89 && (event.ctrlKey) || (event.metaKey)) ||

      // Allow home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
      }

      // IF user presses enter format input data
      if (event.keyCode === 13) {
        this.onBlur(this.elementRef.nativeElement.value);
      }

      switch(this.decimalSize) {
        case 0: this.regex = new RegExp(/^[0-9]+(\.[0-9]{0,2}){0,1}['m','b','k','M','B','K']{0,1}$/g);
          break;
        case 1: this.regex = new RegExp(/^[0-9]+(\.[0-9]{0,2}){0,1}['m','b','k','M','B','K']{0,1}$/g);
          break;
        case 2: this.regex = new RegExp(/^[0-9]+(\.[0-9]{0,2}){0,1}['m','b','k','M','B','K']{0,1}$/g);
          break;
        case 3: this.regex = new RegExp(/^[0-9]+(\.[0-9]{0,2}){0,1}['m','b','k','M','B','K']{0,1}$/g);
          break;
      }

      const current: string = this.elementRef.nativeElement.value;
      const next: string = (this.ele.selectionStart !== current.length) ? event.key : current.concat(event.key);

      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }

  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value:any) {
    this.ele.value = this.currencyPipe.parse(value, this.decimalSize); // opossite of transform
    this.ele.select();
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value:any) {
    this.ele.value = this.currencyPipe.transformMillion(value, this.decimalSize, this.thousandSeprator);
  }

}