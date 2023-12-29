import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {
  constructor(private _el: ElementRef) { }
  key: any;
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (event.clipboardData) {
      const clipboardData = event.clipboardData.getData('text/plain');
      const regex = /^[0-9]+(?: [0-9]+)*$/;
      if (!regex.test(clipboardData)) {
        event.preventDefault();
      }
    }
  }

  @HostListener('keypress', ['$event']) onKeydown(event: KeyboardEvent) {
    if (!((event.key >= '0' && event.key <= '9') ||
      event.key === 'Backspace' ||           // Backspace
      event.key === 'Tab' ||                // Tab
      event.key === 'Delete'
    )) {
      event.preventDefault();
    }
  }

}
