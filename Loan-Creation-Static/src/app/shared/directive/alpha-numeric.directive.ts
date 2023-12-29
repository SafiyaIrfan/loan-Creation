import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphaNumeric]'
})
export class AlphaNumericDirective {

  constructor(private _el: ElementRef) { }
 
  @HostListener('keypress', ['$event']) onKeydown(event: KeyboardEvent) {
      var k;
      k = event.charCode;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 39 || k == 32 || (k >= 48 && k <= 57));       
  }
  
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
      if (event.clipboardData) {
          const clipboardData = event.clipboardData.getData('text/plain');
          const regex = /^[a-zA-Z0-9']+( [a-zA-Z0-9']+)*$/;; // Allow single spaces between alphanumeric characters
          if (!regex.test(clipboardData)) {
              event.preventDefault();
          }
      }
  }
}
