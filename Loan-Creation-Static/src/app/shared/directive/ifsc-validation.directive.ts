import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIfscValidation]'
})
export class IfscValidationDirective {
  constructor(private _el: ElementRef) {}
  key:any
  @HostListener('KEY', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/^[A-Z]{4}[A-Z0-9]{9}$/g, '').toUpperCase();
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
  @HostListener('keypress', ['$event']) onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.key = event.key;
    
    // Check if it's the initial space or a special character
      if ((this.key === ' ' && target.selectionStart === 0) || !/^[a-zA-Z0-9\- ]*$/.test(this.key)) { 
      event.preventDefault();
    }
  }
}
