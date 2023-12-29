import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabet]'
})
export class AlphabetDirective {

  constructor(private _el: ElementRef) { }

  key:any;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
  
    // Check if the pressed key is a double quote and block it
    
    if (this.key === 222 && event.target instanceof HTMLInputElement) {
          const inputElement = event.target as HTMLInputElement;
          const inputValue = inputElement.value;
          const selectionStart = inputElement.selectionStart;
      
          if (selectionStart === 0) {
            event.preventDefault();
          }
        }
        if (event.key === '"') {
          event.preventDefault();
        }
        if (event.altKey && /^[0-9]$/.test(event.key)) {
          event.preventDefault();
          // Optionally, display a message or take another action here.
        }
  
    // Add other key checks as needed
    if (
      !(
        (this.key >= 65 && this.key <= 90) || // A-Z
        event.key === '\'' ||                  // Single quote
        event.key === 'Backspace' ||           // Backspace
        event.key === 'Tab'   ||                // Tab
        event.key === 'Delete' || 
        this.key === 37 ||
        this.key === 39
      )
    ) {
      event.preventDefault();
    }
  }
}
