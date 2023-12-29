import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphnumspl]'
})
export class AlphnumsplDirective {

  constructor(private _el: ElementRef) { }

  key: any;
  hasTyped: boolean = false; // Add this variable to track if any character has been typed
  @HostListener('keypress', ['$event']) onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.key = event.key;

    // Check if it's the initial space or a special character
    if ((this.key === ' ' && target.selectionStart === 0) || !/^[a-zA-Z0-9@.,()&\[\]\/\- ]*$/.test(this.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (event.clipboardData) {
      const clipboardData = event.clipboardData.getData('text/plain');
      const regex = /^[a-zA-Z0-9@.,()&\[\]\/\- ]+( [a-zA-Z0-9@.,()&\[\]\/\- ]+)*$/;; // Allow single spaces between alphanumeric characters
      if (!regex.test(clipboardData)) {
        event.preventDefault();
      }
    }
  }
}
