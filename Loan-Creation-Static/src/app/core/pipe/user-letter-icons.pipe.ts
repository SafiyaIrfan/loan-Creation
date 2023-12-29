import { Pipe, PipeTransform } from '@angular/core';
import { trim } from 'jquery';

@Pipe({
  name: 'userLetterIcons',
  standalone:true
})
export class UserLetterIconsPipe implements PipeTransform {

  transform(value: string, ...args: any[]) {
    let userIconLetter:string;
    let userIconLetterImage:string='';
    let trimmedVal=trim(value);
    if(trimmedVal){
      userIconLetter = (trimmedVal.substring(0,1)).toUpperCase();
      userIconLetterImage = 'assets/images/letter-icons/'+userIconLetter+'.png';
    }
    return userIconLetterImage;
  }


}
