import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPreventAlphanumeric]'
})
export class PreventAlphanumericDirective {

  constructor(private control: NgControl) { }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (event.clipboardData) {
      const clipboardData = event.clipboardData.getData('text/plain');
      const regex = /^[a-zA-Z0-9@.,_()&#\[\]\/\-']+(?: [a-zA-Z0-9@.,_()&#\[\]\/\-']+)*$/; // Allow single spaces between alphanumeric characters
      if (!regex.test(clipboardData)) {
        event.preventDefault();
      }
    }
  }
}
