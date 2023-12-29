import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableSearch'
})
export class TableSearchPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
