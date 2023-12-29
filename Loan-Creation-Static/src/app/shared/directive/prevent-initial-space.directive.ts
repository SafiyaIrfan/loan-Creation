import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventInitialSpace]'
})
export class PreventInitialSpaceDirective {

  constructor(private _el: ElementRef) {}
  key:any
  @HostListener('keypress', ['$event']) onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.key = event.key;
    
    // Check if it's the initial space or a special character
      if (this.key === ' ' && target.selectionStart === 0)  { 
      event.preventDefault();
    }
  }
}
