import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class MyCurrencyPipe implements PipeTransform {

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = ".";
    this.THOUSANDS_SEPARATOR = ",";
  }

  transform(value: number | string, fractionSize: number = 2): string {
    let integer = '' , fraction = '.00';
    var re = new RegExp("^(?:(?:\\d+|\\d*\\.\\d+)(?:[B|b|M|m])?)$");
    if ((value || "").toString().indexOf('B') > -1 || (value || "").toString().indexOf('b') > -1) {
      integer = (value || "").toString().split('B')[0];
      integer = (parseFloat(integer) * 1000000000) + ''      
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    } else {
      integer = (value || "").toString().split(this.DECIMAL_SEPARATOR)[0];

      fraction = (value || "").toString().split(this.DECIMAL_SEPARATOR)[1]
        ? (value || "").toString().split(this.DECIMAL_SEPARATOR)[1]
        : '';
      alert(fraction);
    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    }
    

    return integer + fraction;
  }

  transform1(value: number | string, fractionSize: number = 1): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return 'abc';
  }

  parse(value: string, fractionSize: number = 1): string {
    let [ integer, fraction = "" ] = (value || "").split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

  transformMillion(value: number | string, fractionSize: number = 1, thousandSeprator: boolean = false) {
    let integer = '', fraction = '';

    value = (value + '').toLowerCase();
    value = value.replace(/[a,A,c-jC-J,lL,n-zN-Z]+/, '');

    const tempVal = value.replace(/^0+/, '');
    if (tempVal.length && parseFloat(tempVal) >0) {
      value = value.replace(/^0+/, '');
    }

    if ((value || '').toString().indexOf('b') > -1) {
      integer = (value || '').toString().split('b')[0];
      integer = (parseFloat(integer) * 1000000000).toFixed(fractionSize) + '';
    } else if ((value || '').toString().indexOf('m') > -1) {
      integer = (value || '').toString().split('m')[0];
      integer = (parseFloat(integer) * 1000000).toFixed(fractionSize) + '';
    } else if  ((value || '').toString().indexOf('k') > -1) {
      integer = (value || '').toString().split('k')[0];
      integer = (parseFloat(integer) * 1000).toFixed(fractionSize) + '';
    } else {
      integer = (value || '').toString().split(this.DECIMAL_SEPARATOR)[0];
      fraction = (value || '').toString().split(this.DECIMAL_SEPARATOR)[1]
      ? (value || '').toString().split(this.DECIMAL_SEPARATOR)[1] : '';
    }

    if (parseFloat(integer + fraction) === 0) {
      return '0';
    }

    if (thousandSeprator) {
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    }

    fraction = fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize) : '';
    if (integer.length) {
      return integer + fraction;
    } else if (fraction.length && parseFloat(fraction) > 0) {
      return '0' + fraction;
    } else {
      return '';
    }
  }

}
