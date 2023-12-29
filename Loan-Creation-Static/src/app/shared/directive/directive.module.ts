import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericOnlyDirective } from './numeric-only.directive';
import { PreventAlphanumericDirective } from './prevent-alphanumeric.directive';
import { IfscValidationDirective } from './ifsc-validation.directive';
import { AlphaNumericDirective } from './alpha-numeric.directive';
import { AppDecimalsOnlyDirective } from './app-decimals-only.directive';
import { PreventInitialSpaceDirective } from './prevent-initial-space.directive';
import { AlphabetDirective } from './alphabet.directive';
import { AlphnumsplDirective } from './alphnumspl.directive';

@NgModule({
  declarations: [
    NumericOnlyDirective,
    PreventAlphanumericDirective,
    IfscValidationDirective,
    AlphaNumericDirective,
    AppDecimalsOnlyDirective,
    PreventInitialSpaceDirective,
    AlphabetDirective,
    AlphnumsplDirective, 
  ],

  imports: [
    CommonModule
  ],

  exports: [
    NumericOnlyDirective,
    PreventAlphanumericDirective,
    AlphaNumericDirective,
    IfscValidationDirective,
    AppDecimalsOnlyDirective,
    PreventInitialSpaceDirective,
    AlphabetDirective,
    AlphnumsplDirective,
  ]
})
export class DirectiveModule { }
